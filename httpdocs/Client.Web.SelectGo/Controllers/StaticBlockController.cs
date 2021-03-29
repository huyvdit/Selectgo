using System.Web.Mvc;
using ASP.Web.Core.Controllers.Base;

namespace Web.Controllers
{
    public class StaticBlockController : BaseStaticBlockInheritController
    {

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render content HTML in admin to any location you put it 
        /// Scope: Every where
        /// Express param: identifier find in admin, param: noWrapper set true if no need wrapped div outner.
        /// Example 1:  @Html.Action("Caller", "StaticBlock", new { identifier = "header::hotline", area = "", noWrapper = true }).ToHtmlString()
        /// Example 2:  @Html.Action("Caller", "StaticBlock", new { identifier = "footer::subscribe-to-our-newsletter", area = "" })
        /// </summary>
        /// <param name="identifier"></param>
        /// <param name="noWrapper"></param>
        public new PartialViewResult Caller(string identifier, bool noWrapper = false)
        {
            return base.Caller(identifier, noWrapper);
        }

        /// <summary>
        /// Function: render content html in admin to any location you put it
        /// Scope: Every where
        /// Express param: identifier find in admin, param: noWrapper set true if no need wrapped div outner, param: paramArrs pass out block to in, format json.
        /// </summary>
        /// <param name="identifier"></param>
        /// <param name="paramArrs"></param>
        /// <param name="noWrapper"></param>
        public PartialViewResult CallerWithParams(string identifier, object paramArrs, bool noWrapper = false)
        {
            return base.CallerWith(identifier, paramArrs, noWrapper);
        }


    }

}