using System.Web.Mvc;
using ASP.Web.Core.Controllers.Advance;
using ASP.Web.Model.Models;

namespace Web.Controllers
{
    public class CatalogController : BaseCatalogInheritController
    {
        // @Styles.Render("~/bundles/content/default/category/css") }
        // @Scripts.Render("~/bundles/content/default/category/js")

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render CategoriesSpecial By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderAction("CategoriesAll", "Catalog", new {  pathView = "Widgets/Home/CategoriesAll", area = "" }); }
        /// Example 2:  @{ Html.RenderAction("CategoriesSpecial", "Catalog", new { groupOf = "personal,enterprise,", pathView = "Widgets/Home/CategoriesFeatured", area = "" }); }
        /// </summary>
        /// <param name="groupOf"></param>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult CategoriesSpecial(string groupOf = "*", int take = 6,
            string pathView = "Widgets/CategoriesSpecial", int itemTake =0, string sortBy = "new")
        {
            return base.CategoriesSpecial(groupOf, take, pathView, itemTake, sortBy);
        }


        public new PartialViewResult CategoriesAll(int take = 6, string pathView = "Widgets/CategoriesAll")
        {
            return base.CategoriesAll(take, pathView);
        }


        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render TagsPopular By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderAction("TagsPopular", "Catalog", new {  pathView = "Widgets/Shop/TagsPopular", area = "" }); }

        /// </summary>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult TagsPopular(int take = 6,
            string pathView = "Widgets/TagsPopular")
        {
            return base.TagsPopular(take, pathView);
        }

        public new PartialViewResult TagsRecently(int take = 6,
           string pathView = "Widgets/TagsRecently")
        {
            return base.TagsRecently(take, pathView);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductTab By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderAction("ProductTab", "Catalog", new {groupOf = "personal,",  pathView = "Widgets/Home/ProductTab", area = "" }); }
        /// </summary>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        /// 
        [HttpGet]
        public new PartialViewResult ProductTab(string groupOf = "*", string pathView = "Widgets/Home/ProductTab", int itemTake = 0, string sortBy = "new")
        {
            return base.ProductTab(groupOf, pathView, itemTake, sortBy);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductFocus By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderAction("ProductFocus", "Catalog", new {  pathView = "Widgets/Home/ProductFocus", area = "" }); }
        /// </summary>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult ProductFocus(int take = 6, string pathView = "Widgets/ProductFocus")
        {
            return base.ProductFocus(take, pathView);
        }

        public new PartialViewResult ProductAny(int take = 6, string pathView = "Widgets/ProductAny")
        {
            return base.ProductAny(take, pathView);
        }

        public new PartialViewResult ProductHightLight(int take = 6, string pathView = "Widgets/ProductHightLight")
        {
            return base.ProductHightLight(take, pathView);
        }


        public new PartialViewResult ProductNew(int take = 6, string pathView = "Widgets/ProductNew")
        {
            return base.ProductNew(take, pathView);
        }

        public new PartialViewResult ProductPromotion(int take = 6, string pathView = "Widgets/ProductPromotion")
        {
            return base.ProductPromotion(take, pathView);
        }

        // ProductMostviewed |  ProductTopReview | ProductRecently

        public new PartialViewResult ProductMostviewed(int take = 6, string pathView = "Widgets/ProductMostviewed")
        {
            return base.ProductMostviewed(take, pathView);
        }


        public new PartialViewResult ProductTopReview(int take = 6, string pathView = "Widgets/ProductTopReview")
        {
            return base.ProductTopReview(take, pathView);
        }

        public new PartialViewResult ProductRecently(int take = 6, string pathView = "Widgets/ProductRecently")
        {
            return base.ProductRecently(take, pathView);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductViewed By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:   @{ Html.RenderPartial("~/Views/Default/Catalog/Widgets/ProductReview/_HistogramPartial.cshtml"); }
        /// </summary>
        /// <param name="id"></param>
        public new PartialViewResult HistogramProductReview(int id)
        {
            return base.HistogramProductReview(id);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductViewed By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:   @{ Html.RenderPartial("~/Views/Default/Catalog/Widgets/ProductReview/_AddPartial.cshtml"); }
        /// </summary>
        /// <param name="id"></param>
        public new PartialViewResult AddProductReview(int id)
        {
            return base.AddProductReview(id);
        }
        [HttpPost]
        public new ActionResult AddProductReview(ProductReview productReview)
        {
            return base.AddProductReview(productReview);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ListProductReview By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderPartial("~/Views/Default/Catalog/Widgets/ProductReview/_ListPartial.cshtml"); }
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        public PartialViewResult ListProductReview(int id, int page = 1, int pageSize = 6)
        {

            return base.ListProductReview(id, page);
        }


        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductReviewsRecently By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @Html.Action("ProductReviewsRecently", "Catalog", new {  pathView = "Widgets/Shop/ProductReviewsRecently", area = "" })
        /// </summary>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult ProductReviewsRecently(int take = 6, string pathView = "Widgets/ProductReviewsRecently")
        {
            return base.ProductReviewsRecently(take, pathView);
        }



        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductViewed By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @Html.Action("ProductViewed", "Catalog", new {  pathView = "Widgets/Shop/ProductViewed", area = "" })
        /// </summary>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult ProductViewed(int take = 6, string pathView = "Widgets/ProductViewed")
        {
            return base.ProductViewed(take, pathView);
        }

        #region Shop filters:


        #endregion

    }
    public class CatalogMobileController : CatalogController
    {
        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render ProductTab By Grouped to template defined: ~/Views/Default/Catalog/Widgets/@pathView
        /// Scope: Every where
        /// Example 1:  @{ Html.RenderAction("ProductTab", "Catalog", new {groupOf = "personal,",  pathView = "Widgets/Home/ProductTab", area = "" }); }
        /// </summary>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        /// 
        [HttpGet]
        public PartialViewResult ProductTab(string groupOf = "*", string pathView = "Widgets/Home/ProductTab", int itemTake = 0)
        {
            return base.ProductTab(groupOf, pathView + "_Mobile", itemTake: itemTake);
        }
    }
}