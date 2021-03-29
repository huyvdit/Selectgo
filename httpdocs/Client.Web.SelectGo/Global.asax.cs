using System.Web.Mvc;
using System.Web.Routing;
using static ASP.Web.Core.App_Start.RouteConfig;

namespace Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class SelectgoAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Selectgo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Selectgo_default",
                "Selectgo/{controller}/{action}/{id}",
              new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
    public class MvcApplication : ASP.Web.Core.MvcApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                "Default" // Route name
                , "{controller}/{action}/{id}" // URL with parameters
                , new { area = "Selectgo", controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
                , new[] { "ASP.Selectgo.Controllers" } // Namespace of controllers in root area
            );

        }
       
    }
}