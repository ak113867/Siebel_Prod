// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Synchronisation impossible. V\u00E9rifiez votre connexion r\u00E9seau.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Echec du t\u00E9l\u00E9chargement du package hors ligne. V\u00E9rifiez votre connexion Internet, videz le cache et r\u00E9essayez.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Synchronisez les enregistrements cr\u00E9\u00E9s hors ligne sur le serveur avant d'acc\u00E9der au mode en ligne.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Connectez-vous \u00E0 Internet pour passer en ligne.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Les bases de donn\u00E9es ne sont pas prises en charge par ce navigateur.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Entrez une valeur pour %1, qui est un champ obligatoire.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Echec de l'obtention du package hors ligne du serveur. V\u00E9rifiez la configuration du r\u00E9f\u00E9rentiel hors ligne.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Echec de l'obtention des m\u00E9tadonn\u00E9es du serveur. V\u00E9rifiez que les m\u00E9tadonn\u00E9es appropri\u00E9es sont configur\u00E9es sur le serveur.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Cette op\u00E9ration n'est actuellement pas prise en charge en mode hors ligne.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Erreur lors de la lecture du code \u00E0 barres. Donn\u00E9es non captur\u00E9es.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Synchronisation impossible. Confirmez la disponibilit\u00E9 du serveur et r\u00E9essayez.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synchronisation r\u00E9ussie. Contactez l'administrateur pour v\u00E9rifier les journaux.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "La session de connexion a expir\u00E9. Fermez, puis relancez le navigateur et connectez-vous \u00E0 nouveau pour synchroniser.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Le fichier du r\u00E9f\u00E9rentiel Siebel a chang\u00E9 sur le serveur depuis votre derni\u00E8re synchronisation. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Vos responsabilit\u00E9s utilisateur ont chang\u00E9. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Les donn\u00E9es actuelles sont p\u00E9rim\u00E9es. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "R\u00E9ponse du serveur re\u00E7ue non valide pour la demande : %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Echec du t\u00E9l\u00E9chargement du cache de l'application.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Vous n'\u00EAtes pas autoris\u00E9 \u00E0 ex\u00E9cuter cette synchronisation.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Le noeud distant a chang\u00E9. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Votre position d'utilisateur a chang\u00E9. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "M\u00E9moire insuffisante. Le mode d\u00E9connect\u00E9 ne sera pas pris en charge.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Vous devez d\u00E9tailler au moins un produit avant de proc\u00E9der \u00E0 la soumission.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Impossible de capturer une signature si la date d'appel est ult\u00E9rieure \u00E0 aujourd'hui.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Vous ne pouvez peut-\u00EAtre pas capturer une signature pour un appel qui ne vous appartient pas.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Les valeurs de priorit\u00E9 pour les produits pr\u00E9sent\u00E9s doivent \u00EAtre uniques et dans l'ordre s\u00E9quentiel. V\u00E9rifiez les valeurs de priorit\u00E9 des d\u00E9tails sur le produit pour vous assurer qu'elles respectent cette condition.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "Le champ %1 est requis. Entrez une valeur appropri\u00E9e.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Impossible de soumettre la visite \u00E0 %1. Le num\u00E9ro de r\u00E9f\u00E9rence de l'\u00E9chantillon est obligatoire lorsque des \u00E9chantillons sont d\u00E9pos\u00E9s.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Impossible de soumettre cet appel \u00E0 %1. Une signature papier ou \u00E9lectronique est requise pour soumettre cet appel.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Cette transaction d'\u00E9chantillon ne peut pas \u00EAtre soumise sur une p\u00E9riode rapproch\u00E9e. Modifiez la date de sorte qu'elle tombe sur une p\u00E9riode non rapproch\u00E9e ou active.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Impossible de capturer une signature pour ce type d'interlocuteur.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Modifiez la valeur de quantit\u00E9. Vous n'\u00EAtes autoris\u00E9 \u00E0 \u00E9chantillonner que %2 sur %1 par appel.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Modifiez la valeur de quantit\u00E9. Vous ne pouvez pas \u00E9chantillonner %1 car la quantit\u00E9 disponible %2 serait d\u00E9pass\u00E9e.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Ce professionnel n'est pas autoris\u00E9 pour l'\u00E9chantillonnage. Supprimez les \u00E9chantillons avant de soumettre l'appel.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 est un champ obligatoire.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Le num\u00E9ro de licence de cet interlocuteur a expir\u00E9.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "Le num\u00E9ro DEA de cette adresse n'est pas valide. Entrez un num\u00E9ro correct.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 \u00E0 l'adresse de cet interlocuteur est un champ obligatoire.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Le num\u00E9ro DEA de l'adresse de cet interlocuteur a expir\u00E9. Mettez \u00E0 jour le num\u00E9ro DEA pour l'adresse s\u00E9lectionn\u00E9e.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "S\u00E9lectionnez un autre num\u00E9ro de lot. Le lot num\u00E9ro '%1' s\u00E9lectionn\u00E9 pour l'\u00E9chantillon '%2' expire bient\u00F4t.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Les champs Nom, Pr\u00E9nom, Titre et Adresse de l'interlocuteur doivent \u00EAtre renseign\u00E9s pour la capture d'une signature.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Au moins un \u00E9chantillon doit \u00EAtre abandonn\u00E9 ou demand\u00E9 pour capturer une signature.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "V\u00E9rifiez les r\u00E9sultats de la validation en vue d'une action corrective.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Le num\u00E9ro de licence de cet interlocuteur n'est pas actif.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "Le champ '%1' est obligatoire. Veuillez entrer une valeur.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "L'entr\u00E9e du champ '%1' est trop longue pour figurer dans une base de donn\u00E9es de serveur Siebel Enterprise Server \u00E0 codage UTF-8. R\u00E9essayez avec une entr\u00E9e plus courte.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Pour cr\u00E9er la visite, vous devez choisir Interlocuteur ou Compte, mais pas les deux.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Vous n'\u00EAtes pas autoris\u00E9 \u00E0 effectuer un \u00E9chantillonnage. Contactez le groupe de conformit\u00E9 des \u00E9chantillons.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "La v\u00E9rification de la r\u00E8gle de validation a r\u00E9ussi";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "La r\u00E8gle de validation a \u00E9t\u00E9 ignor\u00E9e car elle ne s'applique pas \u00E0 l'appel en cours";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Le lot num\u00E9ro %1 de l'\u00E9chantillon %2 a expir\u00E9. Supprimez cet article et s\u00E9lectionnez un \u00E9chantillon avec un num\u00E9ro de lot valide";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' est requis pour l'\u00E9chantillon '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Valeur trop longue pour le champ '%1' (taille maximum : %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "La m\u00E9thode sp\u00E9cialis\u00E9e '%1' n'est pas prise en charge pour ce business component.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Cette op\u00E9ration n'est pas disponible pour le champ '%1' en lecture seule.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Op\u00E9ration non valide lorsque le mode de mise \u00E0 jour n'est pas activ\u00E9.\n\nVeuillez continuer ou demander \u00E0 l'administrateur syst\u00E8me de v\u00E9rifier la configuration de l'application si le probl\u00E8me persiste.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Op\u00E9ration non valide en cas d'inactivit\u00E9.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "La mise \u00E0 jour de cet enregistrement est actuellement impossible. Veuillez v\u00E9rifier la valeur des propri\u00E9t\u00E9s No Update dans l'applet, le business component et le lien.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Une transaction est d\u00E9j\u00E0 en cours(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Le champ %1 n'est pas activ\u00E9 dans le business component %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Le mot de passe que vous venez d'entrer est inexact. Veuillez r\u00E9essayer.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Impossible de modifier l'enregistrement sur cette page, probablement parce que vous avez utilis\u00E9 les boutons Suivant et Pr\u00E9c\u00E9dent du navigateur pour y arriver. Servez-vous des boutons Modifier/Cr\u00E9er de l'application pour modifier les enregistrements.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "La valeur '%1' pour le champ '%2' doit \u00EAtre '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Texte d'erreur : Demande d'assistance non valide. Une demande d'assistance valide est requise pour g\u00E9n\u00E9rer une commande.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Impossible d'ex\u00E9cuter la v\u00E9rification de v\u00E9hicule car aucun employ\u00E9 n'a \u00E9t\u00E9 trouv\u00E9.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Date de d\u00E9but de facturation non valide.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Planning de facturation non valide.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "P\u00E9riode de facturation non valide.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Emplacement de stock faisceau introuvable pour le propri\u00E9taire de l'activit\u00E9.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "La m\u00E9thode %1 requiert une valeur pour l'argument %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Il existe d\u00E9j\u00E0 un enregistrement contenant des valeurs identiques \u00E0 celles de l'enregistrement que vous avez cr\u00E9\u00E9.\n\nSi vous souhaitez entrer un nouvel enregistrement, assurez-vous que les valeurs du champ sont uniques.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Une erreur s'est produite lorsque vous vouliez valider (commit) ou annuler (rollback) une transaction de base de donn\u00E9es.(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Supprimez la ligne d\u00E9tail d'\u00E9chantillon pour le produit %1. Vous n'\u00EAtes pas autoris\u00E9 \u00E0 effectuer un \u00E9chantillonnage ou \u00E0 soumettre une demande pour le produit %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Travailler hors ligne";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Travailler en ligne";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Continuer \u00E0 travailler hors ligne";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Charger et travailler en ligne";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synchroniser et rester hors ligne";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Charger et rester hors ligne";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Journal";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Les filtres BusObj ont chang\u00E9. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Les filtres BusComp ont chang\u00E9. Un t\u00E9l\u00E9chargement complet sera effectu\u00E9.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Une r\u00E9ponse pour les d\u00E9tails de pr\u00E9sentation est requise pour que l'appel puisse \u00EAtre soumis. Entrez une valeur appropri\u00E9e.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Ajoutez un interlocuteur(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Ajoutez un nom d'interlocuteur ou un nom de prospect. Ces champs ne peuvent pas \u00EAtre tous deux vides.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Pr\u00E9paration pour utilisation hors ligne";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 fichier(s) sur %2 t\u00E9l\u00E9charg\u00E9(s)";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Synchronisation des donn\u00E9es";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "T\u00E9l\u00E9chargement de la configuration de l'application";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "T\u00E9l\u00E9chargement des donn\u00E9es";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Sauvegarde de la configuration de l'application";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Enregistrement des donn\u00E9es";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 objet(s) sur %2 charg\u00E9(s)";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Validation de l'int\u00E9grit\u00E9 des donn\u00E9es";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Chargement des donn\u00E9es";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Pr\u00E9paration des donn\u00E9es hors ligne";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "La valeur entr\u00E9e dans le champ '%2' du BusComp '%3' ne correspond \u00E0 aucune valeur de la liste de s\u00E9lection impos\u00E9e '%1'.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "La m\u00E9thode sp\u00E9cialis\u00E9e '%1' n'est pas prise en charge en mode hors ligne.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
