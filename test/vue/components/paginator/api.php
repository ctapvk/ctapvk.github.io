<?php
$res = [];
$page = $_GET['page'];
if ($page=='') $page = 1;

$res['current_page']=$page;
$res['from']=1;
$res['last_page']=23;
$res['next_page_url']=1;
$res['per_page']=5;
$res['prev_page_url']=1;
$res['to']=1;
$res['total']=230;

for ($i=0;$i<$res['per_page'];$i++){
    $res['data'][$i]['tema'] = 'tema';
    $res['data'][$i]['text'] = 'text страница ' .$page;
    $res['data'][$i]['date'] = '27.06.2018. 17:0';
    $res['data'][$i]['messagesNew'] = $i%2;
    $res['data'][$i]['messagesTotal'] = $page;
}

echo  json_encode($res , JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);