<?php

namespace App\Helpers;

use Carbon\Carbon;
use URL;
use Exception;
class Helper 
{
  /**
   * daftar bulan
   */
  private static $daftar_bulan=[
    1 => 'Januari',
    2 => 'Februari',
    3 => 'Maret',
    4 => 'April',
    5 => 'Mei',
    6 => 'Juni',
    7 => 'Juli',
    8 => 'Agustus',
    9 => 'September',
    10 => 'Oktober',
    11 => 'November',
    12 => 'Desember',
  ];
  /**
   * daftar bulan romawai
   */
  private static $daftar_bulan_romawi=[
    1 => 'I',
    2 => 'II',
    3 => 'III',
    4 => 'IV',
    5 => 'V',
    6 => 'VI',
    7 => 'VII',
    8 => 'VIII',
    9 => 'IX',
    10 => 'X',
    11 => 'XI',
    12 => 'XII',
  ];
   /*
    * nama hari dalam bahasa indonesia
    */
  private static $daftar_nama_hari = [
    1 => 'Senin',
    2 => 'Selasa',
    3 => 'Rabu',
    4 => 'Kamis',
    5 => 'Jumat',
    6 => 'Sabtu',
    7 => 'Minggu',
  ];
  /**
   * digunakan untuk mendapatkan nama halaman yang sedang diakses
   */
  public static function getNameOfPage (string $action = null)
  {
    $name = explode('.',\Route::currentRouteName());
    if($action === null)
    {
      return $name[0];
    }
    else
    {
      return $name[0].'.'.$action;
    }
    
  }
  /**
   * digunakan untuk mendapatkan aksi halaman yang sedang diakses
   */
  public static function getActionOfPage (string $action = null)
  {
    $actions = explode('.',\Route::currentRouteName());		
    return $actions[count($actions) - 1];
  }
  /**
   * digunakan controller yang sedang diakses
   */
  public static function getCurrentController() 
  {
    $controller_name=strtolower(class_basename(\Route::current()->controller));
    $controller=str_replace('controller','',$controller_name); 
    return $controller;    
  } 
  /**
   * digunakan untuk mendapatkan url halaman yang sedang diakses
   */
  public static function getCurrentPageURL() 
  {   
    return route(Helper::getNameOfPage('index'));    
  }
  /**
   * digunakan untuk mendapatkan status aktif menu
   */
  public static function isMenuActive ($current_page_active, $page_name, $callback_active='active', $callback_inactive='nav-link') 
  {
    if($current_page_active == $page_name)
    {
      return $callback_active;
    }
    else
    {
      return $callback_inactive;
    }
  }
  /**
   * digunakan untuk memformat tanggal
   * @param type $format
   * @param type $date
   * @return type date
   */
  public static function tanggal($format, $date=null, $english=false) {
    Carbon::setLocale(app()->getLocale());
    if($date == null)
    {
      $now = Carbon::now(env('APP_TIMEZONE', 'Asia/Jakarta'));
      $tanggal = Carbon::parse($now);	
      $tanggal = $tanggal->format($format);		
    }
    else
    {
      $tanggal = Carbon::parse($date);						
      $tanggal = $tanggal->format($format);
    }
    if($english)
    {
      return $tanggal;
    }
    else
    {
      $result = str_replace([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
      ],
      $tanggal);

      return str_replace([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November' ,
        'December'
      ],
      [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ], $result);
    }		
  }
  /**
   * digunakan untuk mendapatkan tanggal kemarin
   */
  public static function tanggalKemarin($format)
  {
    Carbon::setLocale(app()->getLocale());
    $kemarin = Carbon::yesterday();
    return Helper::tanggal($format, $kemarin);
  }
  public static function tambahJam($jam, $format, $date=null, $english=false)
  {
    if($date == null)
    {
      $tanggal = Carbon::parse(Carbon::now(env('APP_TIMEZONE', 'Asia/Jakarta')))->addHours($jam);
    }
    else
    {
      $tanggal = Carbon::parse($date);
      $tanggal->setTimeZone(new \DateTimeZone(env('APP_TIMEZONE', 'Asia/Jakarta')));
      $tanggal->addHours($jam);
    }
    return Helper::tanggal($format, $tanggal->format($format), $english);
  }
  public static function tambahMenit($menit, $format, $date=null, $english=false)
  {
    if($date == null)
    {
      $tanggal = Carbon::parse(Carbon::now(env('APP_TIMEZONE', 'Asia/Jakarta')))->addMinutes($menit);
    }
    else
    {
      $tanggal = Carbon::parse($date);
      $tanggal->setTimeZone(new \DateTimeZone(env('APP_TIMEZONE', 'Asia/Jakarta')));
      $tanggal->addMinutes($menit);
    }
    return Helper::tanggal($format, $tanggal->format($format), $english);
  }
  /**
   * tanggal dan waktu sekarang lebih besar dari tanggal dan waktu parameter
   */
  public static function tanggal_gt($param_date) {		
    $start_date = new \DateTime($param_date);
    $now = new \DateTime();
    $now->setTimeZone(new \DateTimeZone(env('APP_TIMEZONE', 'Asia/Jakarta')));
    $sekarang = $now->format('Y-m-d H:i:s');		
    $since_start = $start_date->diff(new \DateTime($sekarang));
    return $since_start->s > 0;
  }
  /**
   * tanggal dan waktu sekarang lebih besar dari tanggal dan waktu parameter
  */
  public static function tanggal_lt($param_date) {
    $start_date = new \DateTime($param_date);
    $now = new \DateTime();
    $now->setTimeZone(new \DateTimeZone(env('APP_TIMEZONE', 'Asia/Jakarta')));
    $sekarang = $now->format('Y-m-d H:i:s');		
    $since_start = $start_date->diff(new \DateTime($sekarang));
    return $since_start->s < 0;
  }
  /**
   * untuk mengetahui tanggal/waktu saat ini telah expire atau belum
   */
  public static function tanggal_expire($waktu_expire) {		
    $start_date = new \DateTime();
    $start_date->setTimeZone(new \DateTimeZone(env('APP_TIMEZONE', 'Asia/Jakarta')));
    $start_date = $start_date->format('Y-m-d H:i:s');	

    $end_date = new \DateTime($waktu_expire);
    $since_start = $end_date->diff(new \DateTime($start_date));		
    return !($since_start->invert > 0);		
  }
    /**
     * untuk mengetahui jumlah tanggal/waktu yang telah berlalu
     */
  public static function tanggal_yang_lalu($waktu_yang_lalu) {		
    $start_date = new \DateTime($waktu_yang_lalu);
    $now = new \DateTime();
    $now->setTimeZone(new \DateTimeZone(env('APP_TIMEZONE', 'Asia/Jakarta')));
    $sekarang = $now->format('Y-m-d H:i:s');		
    $since_start = $start_date->diff(new \DateTime($sekarang));
    
    if($since_start->y >0 )
    {
      return "{$since_start->y} tahun";
    }
    else if($since_start->m >0 )
    {
      return "{$since_start->m} bulan";
    }		
    else if($since_start->d >0 )
    {
      return "{$since_start->d} hari";
    }
    else if($since_start->h >0 )
    {
      return "{$since_start->h} jam";
    }
    else if($since_start->i >0 )
    {
      return "{$since_start->i} menit";
    }
    else if($since_start->h >0 )
    {
      return "{$since_start->h} detik";
    }		
  }
  /**
   * untuk mengetahui durasi antara dua waktu
   */
  public static function getDurationBetweenTwoTimes($start_time, $last_time, $mode = 'm')
  {
    $start = strtotime($start_time);
    $end = strtotime($last_time);
    $mins = ($end - $start) / 60;
    return $mins;
  }
  /**
   * untuk mengetahui apakah tanggal saat ini diantara dua tanggal
   * @param 
   */
  public static function isTodayBetweenTwoDates($startDate, $endDate)
  {
    $currentDate = date('Y-m-d');
    $currentDate = date('Y-m-d', strtotime($currentDate));
   
    $startDate = date('Y-m-d', strtotime($startDate));
    $endDate = date('Y-m-d', strtotime($endDate));
      
    if (($currentDate >= $startDate) && ($currentDate <= $endDate))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  /**
   * untuk mengetahui apakah tanggal waktu saat ini diantara dua tanggal waktu
   * @param 
   */
  public static function isTodayBetweenTwoDateTimes($startDate, $endDate)
  {
    $currentDate = date('Y-m-d H:i:s');
    $currentDate = strtotime($currentDate);
    
    $startDate = strtotime($startDate);
    $endDate = strtotime($endDate);
    
    if (($currentDate >= $startDate) && ($currentDate <= $endDate))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  /**
   * digunakan untuk memperoleh jam skr apakah antara dua jam am
   * 
   * @param startTime jam mulai
   * @param endTime jam selesai
   * @return boolean
   */
  public static function isCurrentTimeAM($startTime = '00:01', $endTime = '11:59')
  {
    $currentTime = date('h:i A', time());		
    $startTime = "$startTime AM";
    $endTime = "$endTime AM";

    if((strtotime($currentTime) >= strtotime($startTime)) && (strtotime($currentTime) <= strtotime($endTime)))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  /**
   * digunakan untuk mendapatkan bulan romawi
   */
  public static function getBulanRomawi($no_bulan = null) 
  {
    if(is_null ($no_bulan))
    {
      $no_bulan = date('n');
    }
    return Helper::$daftar_bulan_romawi[$no_bulan];
  }
  /**
   * digunakan untuk mendapatkan nama hari 
  */
  public static function getNamaHari($no_hari = null)
  {
    if ($no_hari == null)
    {
      return Helper::$daftar_nama_hari;
    }
    else
    {
      return Helper::$daftar_nama_hari[$no_hari];
    }    
  }
  /**
  * casting ke integer	
  */
  public static function toInteger ($stringNumeric) {
    return (int) str_replace('.','',$stringNumeric);
  }
  /**
  * get raw money	
  */
  public static function getRawMoney($stringNumeric) {
    $raw = str_replace('.','',$stringNumeric);		
    return (float) str_replace(',','.',$raw);		
  }
  /**
  * digunakan untuk mem-format uang
  */
  public static function formatUang ($uang=0, $decimal=0) {
    $formatted = number_format((float)$uang,$decimal,',','.');
    return $formatted;
  }
  /**
  * digunakan untuk mem-format angka
  */
  public static function formatAngka ($angka=0) {
    $bil = intval($angka);
    $formatted = ($bil < $angka) ? $angka : $bil;
    return $formatted;
  }
  /**
  * digunakan untuk mem-format persentase
  */
  public static function formatPersen ($pembilang,$penyebut=0,$dec_sep=2) {
    $result = 0.00;
    if($pembilang > 0) {
      $temp = number_format((float)($pembilang/$penyebut)*100,$dec_sep);
      $result = $temp > 100 ? 100.00 : $temp;
    }
    return $result;
  }
  /**
  * digunakan untuk mem-format pecahan
  */
  public static function formatPecahan ($pembilang, $penyebut=0, $dec_sep=2) {
    $result = 0;
    if($pembilang > 0) {
      $result = number_format((float)($pembilang/$penyebut), $dec_sep);
    }
    return $result;
  }
  /**
   * digunakan untuk mendapatkan path cdn media library 
  */
  public static function cdn_media_library($disk_name, $objMedia)
  {
    return \URL::asset($disk_name . '/' . $objMedia->getAttribute('id') . '/' . $objMedia->getAttribute('file_name'));
  }
  /**
   * digunakan untuk mendapatkan url cdn media library 
  */
  public static function cdn_url_media_library($objMedia)
  {
    $image_url = $objMedia->getFullUrl();    
    $url = parse_url($image_url);    
    return \URL::asset($url['path']);        
  }
  /**
   * digunakan untuk memperoleh public path
  */
  public static function public_path($path = null)
  {
    return rtrim(app()->basePath('storage/app/public/' . $path), '/');
  }
  /**
   * digunakan untuk memperoleh public path
  */
  public static function private_path($path = null)
  {
    return rtrim(app()->basePath('storage/app/private/' . $path), '/');
  }
  /**
   * digunakan untuk memperoleh storage path exported
  */
  public static function exported_path($path = null)
  {
    return Helper::public_path("exported/$path");
  }
  /**
   * digunakan untuk memperoleh storage path private
  */
  public static function exported_path_private($path = null)
  {
    return rtrim(app()->basePath('storage/app/private/exported/' . $path), '/');;
  }
  /**
   * digunakan untuk mengecek apakah sebuah json valid atau tidak
   */
  public static function isJson($str) {
    $json = json_decode($str);
    return $json && $str != $json;
  }
  /**
   * digunakan untuk mentrigger fungsi validator exception
  */
  public static function validatorException($validator)
  {
    if($validator->stopOnFirstFailure()->fails())
    {				
      $errors = $validator->errors();				
      foreach ($errors->all() as $k=>$message) 
      {					
        throw new Exception($message);
      }				
    }	
  }
  /**
   * digunakan untuk menulis log ke channel yang bersumber dari class Exception
   * @param $e parameter exception object
   * @param $channel default single
  */
  public static function writeLog($e, $classname, $channel='single')
  {
    \Log::channel($channel)->error("0: {$e->getMessage()}");   
    $traces = $e->getTrace();
    
    foreach($traces as $index => $trace)
    {
      if(isset($trace['class']))
      {
        if($trace['class'] == $classname)
        {
          \Log::channel($channel)->error("Trace($index): $classname:{$trace['line']} function name {$trace['function']} ");  
        }
      }

    }        
  }
  /**
   * ganti index array ke lower atau upper 
  */
  public static function array_change_key_case_recursive($arr, $case = CASE_LOWER)
  {
    return array_map(function($item) {
      if(is_array($item)) 
      {
        $item = \Helper::array_change_key_case_recursive($item);
      }
      return $item;
    }, array_change_key_case($arr, $case));
  }
  /**
   * ganti index array ke lower atau upper 
  */
  public static function removeIdFromArray($arr, $id)
  {
    unset($arr[$id]);
    return $arr;
  }
}