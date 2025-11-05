/*****************************************************************************
 *
 * Copyright (C) 2000, Siebel Systems, Inc., All rights reserved.
 *
 * FILE:       excelintegration.js
 *  $Revision: $
 *      $Date: $
 *    $Author: $ of last update
 *
 * CREATOR:    Jimin Li
 *
 * DESCRIPTION
 *    Excel Integration
 *
 *****************************************************************************/
//GetExcelTemplate
function getfiles(args) {
   //args[0]: URL to get Excel Template
   //args[1]: URL to get Expored Data File
   //args[2]: Language ID (ENU, etc)
   //args[3]: IDS_ERR_XL_CANNOT_LAUNCH_EXCEL (251): Excel application cannot be launched.  Please ensure that you have Excel installed properly on your computer, or please consult your administrator on browser security setting. 
   //args[4]: ERR_QUICKPRINT_URL_LONG (249): Excel can't open a URL longer than  255!

   var myurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
   var myurl1 = myurl +args[0];
   var myurl2 = myurl +args[1];
   var language = args[2];
   var iColumn;
   var i;
   var dWidth;
   var xl;
   var xl1;

   if (myurl1.length > 255)
   {
      alert (args[4]);
      alert (myurl1);
      return (false);
   }

   if (myurl2.length > 255)
   {
      alert (args[4]);
      alert (myurl2);
      return (false);
   }
   //ActiveXObject is IE only method.
   try
   {
      xl = new ActiveXObject ("Excel.Application");
   }
   catch(e)
   {
      alert (args[3]);
      return (false);
   }
   xl.Application.WindowState = -4140;//xlMinimized:-4140 
   xl.Application.Visible = true;
   xl.Application.Workbooks.Open (myurl1);

   xl1 = new ActiveXObject ("Excel.Application");
   xl1.Application.WindowState = -4140;//xlMinimized:-4140
   xl1.Application.Visible = true;
   xl1.Application.Workbooks.Open (myurl2);
   xl1.Application.ActiveSheet.Cells.Select();
   xl1.Application.Selection.Copy();
   
   xl.Application.ActiveSheet.Range("A2").Select();
   xl.Application.ActiveSheet.Paste(); //Special(-4163); //xlPasteValues:-4163

   App().ClosePopup();

   xl1.Application.CutCopyMode = false;
   xl1.Application.ActiveWorkbook.Saved = true;
   xl1.Application.quit();
  
   xl.Application.Run("FormatWorkSheet", language);
   xl.Application.WindowState = -4143;//xlNormal: -4143
}
