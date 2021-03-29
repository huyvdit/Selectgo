using ASP.Web.Core.Helpers;
using ASP.Web.Model.Generic;

namespace Web.Helpers
{
    public static class DataConfigsHelper
    {
        private static readonly IBaseConfigsHelpers Helper = new BaseConfigsHelpers();
        //
        public static string Mode => Helper.Mode();
        public static string NameSpace => Helper.NameSpace();
        public static string Dirs => Helper.Dirs();

        public static string LinksFrontEnd => Helper.LinksFrontEnd();

        public static string Get(string name, bool globalConfigs = false)
        {
            return Helper.Get(name, globalConfigs);
        }
    }

   

}