using ASP.Web.Core.Helpers;

namespace Web.Helpers
{
   
    public static class DataCurrentHelper
    {
        private static readonly IBaseCurrentHelpers Helper = new BaseCurrentHelpers();
        //

        public static string NotifyText => Helper.NotifyText();
        public static string UniqueSeoCode => Helper.UniqueSeoCode();
        public static string LanguageCulture => Helper.LanguageCulture();
        public static double CurrencyRate => Helper.CurrencyRate();
        public static string CurrencyFormatting => Helper.CurrencyFormatting();

        public static string Title(string title)
        {
            return (title) ?? DisplayHelper.StoreName;
        }


    }

    

}