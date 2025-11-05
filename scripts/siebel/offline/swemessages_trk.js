// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Senkronize edilemedi. L\u00FCtfen a\u011F ba\u011Flant\u0131n\u0131z\u0131 kontrol edin.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "\u00C7evrimd\u0131\u015F\u0131 paket indirilemedi. L\u00FCtfen internet ba\u011Flant\u0131n\u0131z\u0131 kontrol edin, \u00F6nbelle\u011Fi temizleyin ve tekrar deneyin.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "L\u00FCtfen \u00C7evrimi\u00E7i moda ge\u00E7meden \u00F6nce \u00E7evrimd\u0131\u015F\u0131 yarat\u0131lan kay\u0131tlar\u0131 sunucuya senkronize edin.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "\u00C7evrimi\u00E7i olmak i\u00E7in l\u00FCtfen internete ba\u011Flan\u0131n.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Veritabanlar\u0131 bu taray\u0131c\u0131da desteklenmiyor.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "L\u00FCtfen %1 i\u00E7in bir de\u011Fer girin (zorunludur).(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "\u00C7evrimd\u0131\u015F\u0131 paket, sunucudan al\u0131namad\u0131. L\u00FCtfen \u00E7evrimd\u0131\u015F\u0131 veri havuzu konfig\u00FCrasyonunu do\u011Frulay\u0131n.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Meta veriler sunucudan al\u0131namad\u0131. L\u00FCtfen uygun meta verilerin sunucuda konfig\u00FCre edilip edilmedi\u011Fini kontrol edin.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Bu i\u015Flem \u015Fu an \u00E7evrimd\u0131\u015F\u0131 modda desteklenmiyor.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Barkod okunurken hata olu\u015Ftu. Veri yakalanmad\u0131.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Senkronize edilemedi. Sunucunun kullan\u0131labilir oldu\u011Funu do\u011Frulay\u0131n ve tekrar deneyin.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Senkronizasyon ba\u015Far\u0131l\u0131 oldu. G\u00FCnl\u00FCk kay\u0131tlar\u0131n\u0131 do\u011Frulamak i\u00E7in l\u00FCtfen y\u00F6neticiye ba\u015Fvurun.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Oturumun s\u00FCresi doldu. Senkronize etmek i\u00E7in l\u00FCtfen taray\u0131c\u0131y\u0131 kapat\u0131p tekrar ba\u015Flat\u0131n ve tekrar oturum a\u00E7\u0131n.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Siebel veri havuzu dosyas\u0131, son senkronizasyonunuzdan sonra sunucuda de\u011Fi\u015Ftirilmi\u015F. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Sorumluluklar\u0131n\u0131z de\u011Fi\u015Ftirildi. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Ge\u00E7erli veriler zaman a\u015F\u0131m\u0131na u\u011Fram\u0131\u015F. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "%1 iste\u011Fi i\u00E7in ge\u00E7ersiz bir sunucu yan\u0131t\u0131 al\u0131nd\u0131.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Uygulama \u00F6nbelle\u011Fi indirilemedi.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Bu senkronizasyonu ger\u00E7ekle\u015Ftirme izniniz yok.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Uzak d\u00FC\u011F\u00FCm de\u011Fi\u015Ftirildi. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Kullan\u0131c\u0131 pozisyonu de\u011Fi\u015Ftirildi. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Yetersiz bellek. Ba\u011Flant\u0131s\u0131z mod desteklenmeyecek.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "G\u00F6ndermeden \u00F6nce en az bir \u00FCr\u00FCn\u00FCn detay\u0131 belirtilmelidir.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "\u00C7a\u011Fr\u0131 Tarihi bug\u00FCnden sonraysa imza yakalanamaz.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Sahibi olmad\u0131\u011F\u0131n\u0131z bir \u00E7a\u011Fr\u0131 i\u00E7in imza yakalayamazs\u0131n\u0131z.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Detaylar\u0131 verilen \u00FCr\u00FCnler i\u00E7in \u00F6ncelik de\u011Ferlerinin benzersiz ve s\u0131ral\u0131 olmas\u0131 gerekir. Bu gereksinimi ihlal etmediklerinden emin olmak i\u00E7in l\u00FCtfen \u00FCr\u00FCn detay\u0131 \u00F6ncelik de\u011Ferlerinizi g\u00F6zden ge\u00E7irin.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 gerekli bir aland\u0131r. Uygun bir de\u011Fer girin.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Ziyaret %1 \u00F6\u011Fesine g\u00F6nderilemedi. Numuneler b\u0131rak\u0131ld\u0131\u011F\u0131nda numune referans numaras\u0131 gereklidir.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Bu \u00E7a\u011Fr\u0131 %1 \u00F6\u011Fesine g\u00F6nderilemiyor. Bu \u00E7a\u011Fr\u0131n\u0131n g\u00F6nderilmesi i\u00E7in bir ka\u011F\u0131t imzas\u0131 veya elektronik imza gerekir.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Bu numune i\u015Flemi mutab\u0131k k\u0131l\u0131nan bir d\u00F6nem i\u00E7in g\u00F6nderilemez. L\u00FCtfen i\u015Flem tarihini mutab\u0131k olunmayan veya aktif bir d\u00F6nemin i\u00E7inde olacak \u015Fekilde de\u011Fi\u015Ftirin.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Bu ilgili ki\u015Fi tipi i\u00E7in imza yakalanamaz.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Miktar de\u011Ferini de\u011Fi\u015Ftirin. \u00C7a\u011Fr\u0131 ba\u015F\u0131na sadece %2 / %1 numuneye izin verilir.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Miktar de\u011Ferini de\u011Fi\u015Ftirin. Kullan\u0131labilir miktar\u0131 (%2) a\u015Ft\u0131\u011F\u0131ndan %1 numunesi olu\u015Fturamazs\u0131n\u0131z.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Uzman numune olu\u015Fturamaz. \u00C7a\u011Fr\u0131y\u0131 g\u00F6ndermeden \u00F6nce numuneleri kald\u0131r\u0131n.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 gerekli bir aland\u0131r.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Bu ilgili ki\u015Finin Lisans Numaras\u0131n\u0131n s\u00FCresi doldu.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "Bu adresin DEA Numaras\u0131 ge\u00E7erli de\u011Fil. L\u00FCtfen ge\u00E7erli bir numara girin.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "Bu ilgili ki\u015Finin adresinde %1 gerekli bir aland\u0131r.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Bu \u0130lgili Ki\u015Fi Adresinin DEA numaras\u0131n\u0131n s\u00FCresi doldu. Se\u00E7ilen adres i\u00E7in DEA numaras\u0131n\u0131 g\u00FCncelleyin.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Ba\u015Fka bir Lot No se\u00E7in. Lot No: '%2' numunesi i\u00E7in se\u00E7ilen '%1' \u00F6\u011Fesinin s\u00FCresi dolmak \u00FCzere.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "\u0130lgili Ki\u015Finin Soyad\u0131, Ad\u0131, Unvan\u0131 ve Adresi alanlar\u0131 imza yakalayabilmek i\u00E7in gereklidir.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "\u0130mza yakalamak i\u00E7in en az bir numunenin da\u011F\u0131t\u0131lmas\u0131 veya istenmesi gerekir.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Devam edebilmek i\u00E7in d\u00FCzeltme eylemine ait Do\u011Frulama Sonu\u00E7lar\u0131na bak\u0131n.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Bu \u0130lgili Ki\u015Finin Lisans Numaras\u0131 Aktif de\u011Fil.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' gerekli bir aland\u0131r. L\u00FCtfen alan i\u00E7in bir de\u011Fer girin.(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "'%1' alan\u0131 i\u00E7in yapt\u0131\u011F\u0131n\u0131z girdi UTF-8 ile kodlanm\u0131\u015F bir kurumsal veritaban\u0131na s\u0131\u011Fmayacak kadar uzun. L\u00FCtfen daha k\u0131sa bir girdi yaparak tekrar deneyin.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "\u00C7a\u011Fr\u0131 olu\u015Fturmak i\u00E7in ya \u0130lgili Ki\u015Fi ya da Hesap se\u00E7melisiniz, ikisini birden se\u00E7emezsiniz.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Numune izniniz yok. Numuneler Uyumluluk Grubuna ba\u015Fvurun.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Do\u011Frulama kural\u0131 kontrol\u00FC ba\u015Far\u0131l\u0131";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Do\u011Frulama kural\u0131 ge\u00E7erli \u00E7a\u011Fr\u0131 i\u00E7in kullan\u0131lamad\u0131\u011F\u0131ndan yok say\u0131l\u0131yor.";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Numune %2 Lot No %1 s\u00FCresi doldu. Bu kalemi kald\u0131r\u0131n ve ge\u00E7eli Lot numaras\u0131na sahip bir numune se\u00E7in.";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' \u00F6\u011Fesi '%2' numunesi i\u00E7in gereklidir";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "'%1' alan\u0131 i\u00E7in de\u011Fer \u00E7ok uzun (maksimum boyut %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Bu i\u015F bile\u015Feninde '%1' \u00F6zel y\u00F6ntemi desteklenmiyor.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Bu i\u015Flem salt okunur alan '%1' i\u00E7in kullan\u0131lamaz.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "G\u00FCncelleme modunda de\u011Filken ge\u00E7ersiz i\u015Flem.L\u00FCtfen devam edin veya sorun giderilemiyorsa sistem y\u00F6neticinizden uygulama konfig\u00FCrasyonunuzu kontrol etmesini isteyin.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Y\u00FCr\u00FCt\u00FClmedi\u011Finde ge\u00E7ersiz i\u015Flem.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "\u015Eu anda bu kayd\u0131 g\u00FCncelleyemezsiniz. L\u00FCtfen Ek Program, \u0130\u015F Bile\u015Feni ve Ba\u011Flant\u0131'da G\u00FCncelleme Yok \u00F6zelliklerini kontrol edin.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Bir i\u015Flem zaten devam ediyor(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "'%2' \u0130\u015F Bile\u015Feninde '%1' alan\u0131 etkinle\u015Ftirilmemi\u015F.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Girdi\u011Finiz ge\u00E7erli parola yanl\u0131\u015F. L\u00FCtfen tekrar girin.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Bu sayfadaki kayd\u0131 de\u011Fi\u015Ftiremezsiniz. Bunun nedeni bu sayfaya eri\u015Fmek i\u00E7in g\u00F6zat\u0131c\u0131n\u0131z\u0131n geri ve ileri d\u00FC\u011Fmelerini kullanman\u0131z olabilir. L\u00FCtfen kay\u0131tlarda de\u011Fi\u015Fiklik yapmak i\u00E7in uygulaman\u0131n i\u00E7indeki D\u00FCzenle/Yeni d\u00FC\u011Fmelerini kullan\u0131n.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "'%2' alan\u0131 i\u00E7in '%1' de\u011Ferinin '%3' olmas\u0131 gerekir.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Hata Metni: Ge\u00E7ersiz Servis \u0130ste\u011Fi. Sipari\u015F olu\u015Fturmak i\u00E7in ge\u00E7erli bir Servis \u0130ste\u011Fi gerekli.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Hi\u00E7bir \u00E7al\u0131\u015Fan bulunamad\u0131\u011F\u0131ndan Ta\u015F\u0131t\u0131 Kontrol Et i\u015Flemi ger\u00E7ekle\u015Ftirilemiyor.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Ge\u00E7ersiz Fatura Ba\u015Flang\u0131\u00E7 Tarihi.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Ge\u00E7ersiz Fatura \u00C7izelgesi.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Ge\u00E7ersiz Fatura Zamanlamas\u0131.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Aktivite sahibi i\u00E7in ta\u015F\u0131t envanter yerle\u015Fimi bulunam\u0131yor.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "%1 y\u00F6ntemiyle ilgili olarak %2 arg\u00FCman\u0131 i\u00E7in ge\u00E7erli bir de\u011Fer gereklidir.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Olu\u015Fturdu\u011Funuz kay\u0131tla ayn\u0131 de\u011Ferleri i\u00E7eren bir kay\u0131t zaten mevcut.\n\nYeni kay\u0131t girmek istiyorsan\u0131z, l\u00FCtfen alan de\u011Ferlerinin benzersiz oldu\u011Fundan emin olun.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Bir veritaban\u0131 i\u015Flemi yap\u0131l\u0131rken/geri al\u0131n\u0131rken hata oldu(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "%1 \u00FCr\u00FCn\u00FC i\u00E7in numune sat\u0131r kalemini kald\u0131r\u0131n. %1 \u00FCr\u00FCn\u00FC i\u00E7in numune olu\u015Fturma veya istek g\u00F6nderme izniniz yok.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "\u00C7evrimd\u0131\u015F\u0131 Ol";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "\u00C7evrimd\u0131\u015F\u0131 Ol";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "\u00C7evrimd\u0131\u015F\u0131 \u00E7al\u0131\u015Fmaya devam et";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Kar\u015F\u0131ya Y\u00FCkle ve \u00C7evrimi\u00E7i Ol";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Senkronize et ve \u00C7evrimd\u0131\u015F\u0131 Kal";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Sadece kar\u015F\u0131ya y\u00FCkle ve \u00C7evrimd\u0131\u015F\u0131 kal";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "G\u00FCnl\u00FCk";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "BusObj Filtreleri de\u011Fi\u015Ftirildi. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "BusComp Filtreleri de\u011Fi\u015Ftirildi. Tam indirme i\u015Flemi uygulanacak.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Sunum Detaylar\u0131 yan\u0131t\u0131n\u0131n \u00C7a\u011Fr\u0131y\u0131 G\u00F6ndermesi gerekir. L\u00FCtfen uygun bir de\u011Fer girin.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "L\u00FCtfen \u0130lgili Ki\u015Fi ekleyin(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Bir \u0130lgili Ki\u015Fi Soyad\u0131 veya M\u00FC\u015Fteri Aday\u0131 Soyad\u0131 belirtin. Her iki alan da bo\u015F olamaz.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "\u00C7evrimd\u0131\u015F\u0131 kullan\u0131m i\u00E7in haz\u0131rlan\u0131yor";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 / %2 dosya indirildi";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Veriler senkronize ediliyor";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Uygulama konfig\u00FCrasyonu indiriliyor";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Veriler indiriliyor";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Uygulama konfig\u00FCrasyonu kaydediliyor";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Veriler kaydediliyor";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 / %2 nesne y\u00FCklendi";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Veri b\u00FCt\u00FCnl\u00FC\u011F\u00FC do\u011Frulan\u0131yor";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Veriler kar\u015F\u0131ya y\u00FCkleniyor";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "\u00C7evrimd\u0131\u015F\u0131 veriler haz\u0131rlan\u0131yor";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "'%3' i\u015F bile\u015Feninin '%2' alan\u0131na girilen de\u011Fer s\u0131n\u0131rl\u0131 se\u00E7im listesi '%1' i\u00E7inde bulunan hi\u00E7bir de\u011Ferle e\u015Fle\u015Fmiyor.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "\u00C7evrimd\u0131\u015F\u0131yken '%1' \u00F6zel y\u00F6ntemi desteklenmez.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
