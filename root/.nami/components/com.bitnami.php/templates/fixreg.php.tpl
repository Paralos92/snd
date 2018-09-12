<?php
/*
(c) 2004-2006 BitRock SL http://www.bitrock.com
*/
$directory = $argv[1];
/* "{{$app.installdir}}";*/
$placeholder= $argv[2];
$bitrock_php_path = $argv[3];

ini_set("magic_quotes_runtime", 0);

function my_array_walk_and_replace ($myarray) {
    global $bitrock_php_path;
    global $placeholder;
    $localarray = array();
    foreach ($myarray as $key => $value) {
        if (is_array($value)) {
            $value = my_array_walk_and_replace($value);
        } elseif(is_string($value))  {
            $value = str_replace($placeholder, $bitrock_php_path, $value);
        } else {
            //number, no need to subst
        }
        $localarray[str_replace($placeholder, $bitrock_php_path, $key)] = $value;
    }
    return $localarray;
}
foreach (glob($argv[1] . "/*.reg") as $file) {
    echo "Patching $file\n";
    $array = unserialize(file_get_contents($file));
    $array=my_array_walk_and_replace($array);
    $f = fopen($file, "w");
    fwrite($f,serialize($array));
    fclose($f);
}
foreach (glob($argv[1] . "/pear.conf") as $file) {
    echo "Patching $file\n";
    $contents = file_get_contents($file);
    preg_match('/^\#PEAR_Config\s+(\S+)\s+/si', $contents, $matches);
    $version = $matches[1];
    $contents = substr($contents, strlen($matches[0]));
    $array = unserialize($contents);
    $array=my_array_walk_and_replace($array);
    $f = fopen($file, "w");
    fwrite($f,"#PEAR_Config $version\n" . serialize($array) . "\n");
    fclose($f);
}
exit(0);
?>
