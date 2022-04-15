<?php
	header("Access-Control-Allow-Origin: http://localhost:3000");
	
	
	/*
	
	DONE:
	- time frame (have both ends regaradless of mod)
	- multi-database support

	
	
	
	TODO:
	- tuplecount
	- more complex stats
	- group computations? (ideally frontend)
	- averaging rather than pulling? (def not worth, just use higher res)
	
	*/
	
	$dbServername = "//oracle.cise.ufl.edu/orcl";
	$dbUsername = "jschedel";
	$dbPassword ="YvlckrJou5LvVgMR0wlzBlbY";
	$dbName = "orcl";
	
	
	$conn = oci_connect($dbUsername, $dbPassword, $dbServername);
	
	
	

function error($message = "An internal or external error occurred") {
    exit(json_encode(array('error' => $message)));
}

function tupleCount() {
	global $conn;
	
    // Create Connection to Datbase
    if (!$conn) error("Could not connect to database.");
	
	$countResponse = 0;

	
	
	$countStatement = oci_parse($conn, "SELECT COUNT(*) AS TOTAL FROM JSCHEDEL.stockReport");
	
	oci_execute($countStatement);
	
	$countResponse = $countResponse + oci_fetch_assoc($countStatement)['TOTAL'];
	
	oci_free_statement($countStatement);
	
	
	
	$countStatement = oci_parse($conn, "SELECT COUNT(*) AS TOTAL FROM CHRISTIANMOSEY.stockReport");
	
	oci_execute($countStatement);
	
	$countResponse = $countResponse + oci_fetch_assoc($countStatement)['TOTAL'];
	
	oci_free_statement($countStatement);
	
	
	
	$countStatement = oci_parse($conn, "SELECT COUNT(*) AS TOTAL FROM \"C.ONOH\".stockReport");
	
	oci_execute($countStatement);
	
	$countResponse = $countResponse + oci_fetch_assoc($countStatement)['TOTAL'];
	
	oci_free_statement($countStatement);
	
	

	exit(json_encode($countResponse));
	
}

function getStockData($ticker, $statistic, $resolution, $startDate, $endDate) {
	
	$i = 0;
	
	global $conn;
	
	if($resolution < 2) {
		error("Resolution must be 2 or more!");
	}
	
    // Create Connection to Datbase
    if (!$conn) error("Could not connect to database.");
	
	$statistic = strtolower($statistic);
	
	switch ($statistic) {
		case "adjusted close":	
			$statistic = "adjustedClose";
			break;
		case "open":			
			break;
		case "close":			
			break;
		case "low":			
			break;
		case "high":			
			break;
		case "volume":			
			break;
		default:
			error("Malformed Stock Data Request: Invalid Statistic");
			break;
	}
	
	
	
	
	$userDB = "JSCHEDEL";
	if($ticker[$i] >= 'SCI') {
		$userDB = "CHRISTIANMOSEY";
		
	} else if($ticker[$i] >= 'IBCP') {
		$userDB = "\"C.ONOH\"";
		
	}
	





	if($startDate == NULL) {
		
		$dateStatement = oci_parse($conn, "SELECT reportDate FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[0]}' ORDER BY reportDate ASC FETCH FIRST 1 ROW ONLY");
		
		oci_execute($dateStatement);

		$startDate = oci_fetch_assoc($dateStatement)['REPORTDATE'];
		
		for ($j=1, $len=count($ticker); $j<$len; $j++) {
			
			$userDB = "JSCHEDEL";

	
			if($ticker[$j] >= 'SCI') {
				$userDB = "CHRISTIANMOSEY";
				
			} else if($ticker[$j] >= 'IBCP') {
				$userDB = "\"C.ONOH\"";
				
			}
						
			$dateStatement2 = oci_parse($conn, "SELECT reportDate FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$j]}' ORDER BY reportDate ASC FETCH FIRST 1 ROW ONLY");
			
			
			oci_execute($dateStatement2);

			
			$temp = oci_fetch_assoc($dateStatement2)['REPORTDATE'];
			
			if($temp > $startDate) {
				
				$startDate = $temp;
				
			}
			
		}

		oci_free_statement($dateStatement);
		
	} else {
		
		$dateStatement = oci_parse($conn, "SELECT reportDate, ABS(reportDate - to_date('{$startDate}', 'YYYY-MM-DD')) AS dateDiff FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$i]}' ORDER BY dateDiff ASC FETCH FIRST 1 ROWS ONLY");
		
		oci_execute($dateStatement);
		
		$startDate = oci_fetch_assoc($dateStatement)['REPORTDATE'];
				
		oci_free_statement($dateStatement);
		
	}
	
	
	
	
	
	if($endDate == NULL) {
		
		
		$userDB = "JSCHEDEL";
		if($ticker[0] >= 'SCI') {
		$userDB = "CHRISTIANMOSEY";
		
		} else if($ticker[0] >= 'IBCP') {
			$userDB = "\"C.ONOH\"";
			
		}
		
		$dateStatement3 = oci_parse($conn, "SELECT reportDate FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[0]}' ORDER BY reportDate DESC FETCH FIRST 1 ROW ONLY");
		
		oci_execute($dateStatement3);

		$endDate = oci_fetch_assoc($dateStatement3)['REPORTDATE'];
		
		for ($j=1, $len=count($ticker); $j<$len; $j++) {
			
			$userDB = "JSCHEDEL";
			if($ticker[$j] >= 'SCI') {
				$userDB = "CHRISTIANMOSEY";
				
			} else if($ticker[$j] >= 'IBCP') {
				$userDB = "\"C.ONOH\"";
				
			}
						
			$dateStatement4 = oci_parse($conn, "SELECT reportDate FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$j]}' ORDER BY reportDate DESC FETCH FIRST 1 ROW ONLY");
			
			
			oci_execute($dateStatement4);

			
			$temp = oci_fetch_assoc($dateStatement4)['REPORTDATE'];
			
			if($temp < $endDate) {
				
				$endDate = $temp;
				
			}
			
		}

		oci_free_statement($dateStatement3);
		
		
		
		
		
	} else {
		
		$dateStatement = oci_parse($conn, "SELECT reportDate, ABS(reportDate - to_date('{$endDate}', 'YYYY-MM-DD')) AS dateDiff FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$i]}' ORDER BY dateDiff ASC FETCH FIRST 1 ROWS ONLY");
		
		oci_execute($dateStatement);
		
		$endDate = oci_fetch_assoc($dateStatement)['REPORTDATE'];
				
		oci_free_statement($dateStatement);
		
	}
	
	
	$userDB = "JSCHEDEL";
	if($ticker[$i] >= 'SCI') {
		$userDB = "CHRISTIANMOSEY";
		
	} else if($ticker[$i] >= 'IBCP') {
		$userDB = "\"C.ONOH\"";
		
	}
	
	
	//exit($endDate);
	
	
	
	$IDstatement1 = oci_parse($conn, "SELECT id FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$startDate}'");
	
	oci_execute($IDstatement1);
	
	$startID = oci_fetch_assoc($IDstatement1)['ID'];
	
	oci_free_statement($IDstatement1);
	
	
	$IDstatement2 = oci_parse($conn, "SELECT id FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$endDate}'");
	
	oci_execute($IDstatement2);
	
	$endID = oci_fetch_assoc($IDstatement2)['ID'];
	
	oci_free_statement($IDstatement2);
	
	//error("{$startID}   {$endID}");
		
	
	$countDiff = (int)$endID - (int)$startID;
	
	$resolution = $resolution - 1;
	
	if($countDiff < $resolution) {
		
		$countDiff = $resolution;
		
	}
	
	$modResolution = $countDiff/$resolution;
	
	
	$statement = oci_parse($conn, "SELECT reportDate, {$statistic} FROM {$userDB}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND (((reportDate >= '{$startDate}') AND (reportDate <= '{$endDate}') AND (   MOD(ID, CAST({$modResolution} AS INT)) - MOD({$startID}, CAST({$modResolution} AS INT)) = '0'   )) OR reportDate = '{$endDate}') ORDER BY reportDate ASC");
	
	
	
	oci_execute($statement);
	
		
	$response = array();
	
	
	$a = 0;


	while (   ($row = oci_fetch_assoc($statement))) {
		
		
		$response[$a]['Name'] = $row['REPORTDATE'];
		
		
				
		$response[$a][$ticker[0]] = $row[strtoupper($statistic)];
		
		
		$a = $a + 1;
	}
	
	
	
	
	
	
	
	
	
	
	if(count($ticker) > 1) {
		
		$i = 1;
		
		$userDB2 = "JSCHEDEL";

		
		if($ticker[$i] >= 'SCI') {
			$userDB2 = "CHRISTIANMOSEY";
			
		} else if($ticker[$i] >= 'IBCP') {
			$userDB2 = "\"C.ONOH\"";
			
		}
						
		$IDstatement12 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$startDate}'");
		
		oci_execute($IDstatement12);
		
		$startID2 = oci_fetch_assoc($IDstatement12)['ID'];
				
		oci_free_statement($IDstatement12);
		
		
		$IDstatement22 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$endDate}'");
		
		oci_execute($IDstatement22);
		
		$endID2 = oci_fetch_assoc($IDstatement22)['ID'];
		
		oci_free_statement($IDstatement22);
		
		//error("{$startID}   {$endID}");
			
		
		$countDiff2 = (int)$endID2 - (int)$startID2;
				
		if($countDiff2 < $resolution) {
			
			$countDiff2 = $resolution;
			
		}
		
		$modResolution2 = $countDiff2/$resolution;
		
		
		$statement2 = oci_parse($conn, "SELECT reportDate, {$statistic} FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND (((reportDate >= '{$startDate}') AND (reportDate <= '{$endDate}') AND (   MOD(ID, CAST({$modResolution2} AS INT)) - MOD({$startID}, CAST({$modResolution2} AS INT)) = '0'   )) OR reportDate = '{$endDate}') ORDER BY reportDate ASC");
		
		
		oci_execute($statement2);
				
		
		
		$a = 0;

		while ($row2 = oci_fetch_assoc($statement2)) {

			$response[$a][$ticker[$i]] = $row2[strtoupper($statistic)];
			
			$a = $a + 1;
		}
		
		oci_free_statement($statement2);
		
		unset($statement2);

		
		
	}
	
	
	if(count($ticker) > 2) {
		
		$i = 2;
		
		$userDB2 = "JSCHEDEL";

		
		if($ticker[$i] >= 'SCI') {
			$userDB2 = "CHRISTIANMOSEY";
			
		} else if($ticker[$i] >= 'IBCP') {
			$userDB2 = "\"C.ONOH\"";
			
		}
		
				
		$IDstatement12 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$startDate}'");
		
		oci_execute($IDstatement12);
		
		$startID2 = oci_fetch_assoc($IDstatement12)['ID'];
				
		oci_free_statement($IDstatement12);
		
		
		$IDstatement22 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$endDate}'");
		
		oci_execute($IDstatement22);
		
		$endID2 = oci_fetch_assoc($IDstatement22)['ID'];
		
		oci_free_statement($IDstatement22);
		
		//error("{$startID}   {$endID}");
			
		
		$countDiff2 = (int)$endID2 - (int)$startID2;
				
		if($countDiff2 < $resolution) {
			
			$countDiff2 = $resolution;
			
		}
		
		$modResolution2 = $countDiff2/$resolution;
		
		
		$statement2 = oci_parse($conn, "SELECT reportDate, {$statistic} FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND (((reportDate >= '{$startDate}') AND (reportDate <= '{$endDate}') AND (   MOD(ID, CAST({$modResolution2} AS INT)) - MOD({$startID}, CAST({$modResolution2} AS INT)) = '0'   )) OR reportDate = '{$endDate}') ORDER BY reportDate ASC");
		
		
		oci_execute($statement2);
				
		
		
		$a = 0;

		while ($row2 = oci_fetch_assoc($statement2)) {

			$response[$a][$ticker[$i]] = $row2[strtoupper($statistic)];
			
			$a = $a + 1;
		}
		
		oci_free_statement($statement2);
		
		unset($statement2);

		
		
	}


	
	
	
	if(count($ticker) > 3) {
		
		$i = 3;
		
		$userDB2 = "JSCHEDEL";

		
		if($ticker[$i] >= 'SCI') {
			$userDB2 = "CHRISTIANMOSEY";
			
		} else if($ticker[$i] >= 'IBCP') {
			$userDB2 = "\"C.ONOH\"";
			
		}
		
				
		$IDstatement12 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$startDate}'");
		
		oci_execute($IDstatement12);
		
		$startID2 = oci_fetch_assoc($IDstatement12)['ID'];
				
		oci_free_statement($IDstatement12);
		
		
		$IDstatement22 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$endDate}'");
		
		oci_execute($IDstatement22);
		
		$endID2 = oci_fetch_assoc($IDstatement22)['ID'];
		
		oci_free_statement($IDstatement22);
		
		//error("{$startID}   {$endID}");
			
		
		$countDiff2 = (int)$endID2 - (int)$startID2;
				
		if($countDiff2 < $resolution) {
			
			$countDiff2 = $resolution;
			
		}
		
		$modResolution2 = $countDiff2/$resolution;
		
		
		$statement2 = oci_parse($conn, "SELECT reportDate, {$statistic} FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND (((reportDate >= '{$startDate}') AND (reportDate <= '{$endDate}') AND (   MOD(ID, CAST({$modResolution2} AS INT)) - MOD({$startID}, CAST({$modResolution2} AS INT)) = '0'   )) OR reportDate = '{$endDate}') ORDER BY reportDate ASC");
		
		
		oci_execute($statement2);
				
		
		
		$a = 0;

		while ($row2 = oci_fetch_assoc($statement2)) {

			$response[$a][$ticker[$i]] = $row2[strtoupper($statistic)];
			
			$a = $a + 1;
		}
		
		oci_free_statement($statement2);
		
		unset($statement2);

		
		
	}
	
	
	
	
	if(count($ticker) > 4) {
		
		$i = 4;
		
		$userDB2 = "JSCHEDEL";

		
		if($ticker[$i] >= 'SCI') {
			$userDB2 = "CHRISTIANMOSEY";
			
		} else if($ticker[$i] >= 'IBCP') {
			$userDB2 = "\"C.ONOH\"";
			
		}
		
				
		$IDstatement12 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$startDate}'");
		
		oci_execute($IDstatement12);
		
		$startID2 = oci_fetch_assoc($IDstatement12)['ID'];
				
		oci_free_statement($IDstatement12);
		
		
		$IDstatement22 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$endDate}'");
		
		oci_execute($IDstatement22);
		
		$endID2 = oci_fetch_assoc($IDstatement22)['ID'];
		
		oci_free_statement($IDstatement22);
		
		//error("{$startID}   {$endID}");
			
		
		$countDiff2 = (int)$endID2 - (int)$startID2;
				
		if($countDiff2 < $resolution) {
			
			$countDiff2 = $resolution;
			
		}
		
		$modResolution2 = $countDiff2/$resolution;
		
		
		$statement2 = oci_parse($conn, "SELECT reportDate, {$statistic} FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND (((reportDate >= '{$startDate}') AND (reportDate <= '{$endDate}') AND (   MOD(ID, CAST({$modResolution2} AS INT)) - MOD({$startID}, CAST({$modResolution2} AS INT)) = '0'   )) OR reportDate = '{$endDate}') ORDER BY reportDate ASC");
		
		
		oci_execute($statement2);
				
		
		
		$a = 0;

		while ($row2 = oci_fetch_assoc($statement2)) {

			$response[$a][$ticker[$i]] = $row2[strtoupper($statistic)];
			
			$a = $a + 1;
		}
		
		oci_free_statement($statement2);
		
		unset($statement2);

		
		
	}
	

	if(count($ticker) > 5) {
		
		$i = 5;
		
		$userDB2 = "JSCHEDEL";

		
		if($ticker[$i] >= 'SCI') {
			$userDB2 = "CHRISTIANMOSEY";
			
		} else if($ticker[$i] >= 'IBCP') {
			$userDB2 = "\"C.ONOH\"";
			
		}
		
				
		$IDstatement12 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$startDate}'");
		
		oci_execute($IDstatement12);
		
		$startID2 = oci_fetch_assoc($IDstatement12)['ID'];
				
		oci_free_statement($IDstatement12);
		
		
		$IDstatement22 = oci_parse($conn, "SELECT id FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND reportDate = '{$endDate}'");
		
		oci_execute($IDstatement22);
		
		$endID2 = oci_fetch_assoc($IDstatement22)['ID'];
		
		oci_free_statement($IDstatement22);
		
		//error("{$startID}   {$endID}");
			
		
		$countDiff2 = (int)$endID2 - (int)$startID2;
				
		if($countDiff2 < $resolution) {
			
			$countDiff2 = $resolution;
			
		}
		
		$modResolution2 = $countDiff2/$resolution;
		
		
		$statement2 = oci_parse($conn, "SELECT reportDate, {$statistic} FROM {$userDB2}.stockReport WHERE stockTicker = '{$ticker[$i]}' AND (((reportDate >= '{$startDate}') AND (reportDate <= '{$endDate}') AND (   MOD(ID, CAST({$modResolution2} AS INT)) - MOD({$startID}, CAST({$modResolution2} AS INT)) = '0'   )) OR reportDate = '{$endDate}') ORDER BY reportDate ASC");
		
		
		oci_execute($statement2);
				
		
		
		$a = 0;

		while ($row2 = oci_fetch_assoc($statement2)) {

			$response[$a][$ticker[$i]] = $row2[strtoupper($statistic)];
			
			$a = $a + 1;
		}
		
		oci_free_statement($statement2);
		
		unset($statement2);

		
		
	}
	
		
	oci_free_statement($statement);
	//oci_close($conn);
	
	oci_close($conn);
	
	
	
	
	
	
	
	exit(json_encode($response));

}
	
	//Handles HTTP Requests for the file
	if (isset($_POST['Reason'])) {
		switch ($_POST['Reason']) {
			default:
				error("Malformed Request: Invalid Reason");
				break;
		}
	} else if (isset($_GET['Reason'])) {
		switch ($_GET['Reason']) {
			case "tupleCount":
				tupleCount();
				break;
			case "stockData":			
				getStockData($_GET['Ticker'], $_GET['Statistic'], $_GET['Resolution'], $_GET['StartDate'], $_GET['EndDate']);         //Get the meta data of every story the user has access to
				break;
			default:
				error("Malformed Request: Invalid Reason");
				break;
		}
	} else {
		error("Malformed Request: No Reason Given");
	}

?>
