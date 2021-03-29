
using System.Web.Http;
using ASP.Web.Core.Api;
using ASP.Web.Core.Filters;

namespace Web.Api
{
    public class ToolController : GatewayController
    {
        /// <summary>
        // Dev in local when change Album,Menu,Category,Blog:
        /// </summary>
        [ToolsBasicAuthenticationFilter]
        [HttpGet]
        public int WebFlushCache()
        {
            return base.ClearCache("*");
        }

        /// <summary>
        // Dev in local when change StaticPage,StaticBlock,Global Setting:
        /// </summary>
        [ToolsBasicAuthenticationFilter]
        [HttpGet]
        public string AdminAsynTo()
        {
            return base.AsynAllToFile() as string;
        }
       
    }

}