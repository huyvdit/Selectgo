using System.Web.Mvc;
using ASP.Web.Core.Controllers.Advance;

namespace Web.Controllers
{
    public class BlogController : BaseBlogInheritController
    {
        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render CategoriesSpecial By Grouped to template defined: ~/Views/Default/Blog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderAction("CategoriesAll", "Blog", new {  pathView = "Widgets/BlogCategory/Archives", area = "" }); }
        /// Example 2:  @{ Html.RenderAction("CategoriesSpecial", "Blog", new { groupOf = "news,promotion,", pathView = "Widgets/Home/CategoriesFeatured", area = "" }); }
        /// </summary>
        /// <param name="groupOf"></param>
        /// <param name="groupedForced"></param>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult CategoriesSpecial(string groupOf = "*", string groupedForced = "", int take = 6,
            string pathView = "Widgets/CategoriesSpecial")
        {
            return base.CategoriesSpecial(groupOf, groupedForced, take, pathView);
        }


        public new PartialViewResult CategoriesAll(int take = 6, string pathView = "Widgets/CategoriesAll")
        {
            return base.CategoriesAll(take, pathView);
        }

        public new PartialViewResult LatestPosts(int blogCategoryId, int take = 6, string pathView = "Widgets/LatestPosts")
        {
            return base.LatestPosts(blogCategoryId, take: take, pathView: pathView);
        }

        public new PartialViewResult PopularPosts(int blogCategoryId, int take = 6, string pathView = "Widgets/PopularPosts")
        {
           
            return base.PopularPosts(blogCategoryId, take: take, pathView: pathView);
        }

        public new PartialViewResult PopularTags(int blogCategoryId, int take = 6, string pathView = "Widgets/PopularTags")
        {
           
            return base.PopularTags(blogCategoryId, take: take, pathView: pathView);
        }

        // BLOGCATEGORY:
        // @Styles.Render("~/bundles/content/default/blogcategory/css") }
        // @Scripts.Render("~/bundles/content/default/blogcategory/js")
        // BLOGPOST:
        // @Styles.Render("~/bundles/content/default/blogpost/css") }
        // @Scripts.Render("~/bundles/content/default/blogpost/js")
        // BLOGTAG:
        // @Styles.Render("~/bundles/content/default/blogtag/css") }
        // @Scripts.Render("~/bundles/content/default/blogtag/js")

    }
}