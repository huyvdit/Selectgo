using System;
using System.Collections.Generic;
using System.Web.Mvc;
using ASP.Web.Core.Controllers.Base;
using ASP.Web.Core.Models;
using ASP.Web.Model.Generic;

namespace Web.Controllers
{
    public class WidgetsController : BaseWidgetsInheritController
    {

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render Menu  By data breadcrumbs input => render by template defined: ~/Views/Widgets/Breadcrumbs.cshtml
        /// Scope: Every where
        /// Express param: homeIncluded set True => icon home appear in breadcrumbs. headingIncluded set True => h1 appear in breadcrumbs (depended in template defined)
        /// Example 1: @Html.Action("Breadcrumb", "Widgets", new { breadcrumbs = new List<BreadcrumbModel> { new BreadcrumbModel { Link = SlugHelper.Product(Convert.ToInt32(Page.ParentId)), Title = Page.Parent.Name }, new BreadcrumbModel { Link = "#", Title = Page.Name } }, homeIncluded = true, headingIncluded = false, area = "" })
        /// </summary>
        /// <param name="breadcrumbs"></param>
        /// <param name="homeIncluded"></param>
        /// <param name="headingIncluded"></param>
        public  ActionResult Breadcrumb(List<BreadcrumbModel> breadcrumbs, bool homeIncluded = true,
         bool headingIncluded = false)
        {
            return base.Breadcrumb(breadcrumbs, homeIncluded, headingIncluded);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render Menu  By Identifier to template defined: ~/Views/Widgets/Menu/@pathView
        /// Scope: Every where
        /// Example 1: @Html.Action("Menu", "Widgets", new { identifier = "menu-main", area = "" })
        /// Example 2: @Html.Action("Menu", "Widgets", new { identifier = "menu-compact", area = "", pathView = "Menu/Minified" })
        /// </summary>
        /// <param name="identifier"></param>
        /// <param name="pathView"></param>
        /// <param name="noWrapper"></param>
        /// 
        [HttpGet]
        public ActionResult Menu(string identifier, string pathView = "Menu/Main",
            bool noWrapper = false)
        {
            return base.Menu(identifier, "", pathView, noWrapper);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render Album By Identifier to template defined: ~/Views/Widgets/Album/@pathView
        /// Scope: Every where
        /// Example 1:@{ Html.RenderAction("Album", "Widgets", new { identifier = "home-slider", pathView = "Album/Home", noWrapper = true, area = "" }); }
        /// Example 2:@{ Html.RenderAction("Album", "Widgets", new { identifier = "home-clients-partners", pathView = "Album/ClientsPartners", noWrapper = true, area = "" }); }
        /// </summary>
        /// <param name="identifier"></param>
        /// <param name="pathView"></param>
        public PartialViewResult Album(string identifier, string pathView = "Album/General")
        {
            return base.Album(identifier, "", pathView);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render LatestPosts By blogCategoryId | grouped  to template defined: ~/Views/Widgets/Blog/@pathView
        /// Scope: Every where
        /// Example 1: @Html.Action("LatestPosts", "Widgets", new { grouped = "news", groupedForced = "news-featuring", take = 3, pathView = "Blog/LatestPostsIndex", area = "" })
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <param name="grouped"></param>
        /// <param name="groupedForced"></param>
        /// <param name="type"></param>
        /// <param name="take"></param>
        /// <param name="excerptId"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult LatestPosts(int blogCategoryId = -1, string grouped = "any",
            string groupedForced = "",
            string type = "*", int take = 5, int excerptId = 0, string pathView = "Blog/LatestPosts")
        {
            return base.LatestPosts(blogCategoryId, grouped, groupedForced, type, take, excerptId, pathView);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render PopularTags By blogCategoryId to template defined: ~/Views/Widgets/Blog/@pathView
        /// Scope: BlogCategory | BlogPost Page
        /// Example 1:  @Html.Action("PopularTags", "Widgets", new { blogCategoryId = blogCategory.Id, area = "" })
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult PopularTags(int blogCategoryId, int take = 5,  string pathView = "Blog/PopularTags")
        {
            return base.PopularTags(blogCategoryId, take, pathView);
        }


        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render MostviewedPosts By blogCategoryId to template defined: ~/Views/Widgets/Blog/@pathView
        /// Scope: BlogCategory | BlogPost Page
        /// Example 1:  @Html.Action("MostviewedPosts", "Widgets", new { blogCategoryId = blogCategory.Id, area = "" })
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult MostviewedPosts(int blogCategoryId, int take = 5,
            string pathView = "Blog/MostviewedPosts")
        {
            return base.MostviewedPosts(blogCategoryId, take, pathView);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render AssociatedProducts By blogCategoryId to template defined: ~/Views/Widgets/Blog/@pathView
        /// Scope: BlogCategory | BlogPost Page
        /// Example 1:  @Html.Action("AssociatedProducts", "Widgets", new { blogCategoryId = blogCategory.Id, area = "" })
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult AssociatedProducts(int blogCategoryId, int take = 5,
            string pathView = "Blog/AssociatedProducts")
        {
            return base.AssociatedProducts(blogCategoryId, take, pathView);
        }

        /// <summary>
        /// Frequency of use: Dependencies required
        /// Function: Render TestimonialSpecial by Type to template defined: ~/Views/Widgets/Testimonials/@pathView
        /// Scope: Every where
        /// Express param: type: latest|displayOrder, 
        /// Example 1:  @Html.Action("TestimonialSpecial", "Widgets", new { type = "latest", area = "" })
        /// </summary>
        /// <param name="type"></param>
        /// <param name="take"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult TestimonialSpecial(string type, int take = 4, string pathView = "Testimonials/Special")
        {
            return base.TestimonialSpecial(type, take, pathView);
        }

        public new PartialViewResult ListTestimonials(string orderBy = "default", int page = 1, int pageSize = 0, string pathView = "Testimonials/List")
        {
            return base.ListTestimonials(orderBy, page, pageSize, pathView);
        }


        /// <summary>
        /// Function: render ProductClassify | Deprecated
        /// </summary>
        /// <param name="type"></param>
        /// <param name="take"></param>
        /// <param name="scope"></param>
        /// <param name="filter"></param>
        /// <param name="pathView"></param>
        public new PartialViewResult ProductClassify(string type, int take, string scope, string filter = "*", string pathView = "Special")
        {
            return base.ProductClassify(type, take, scope, filter, pathView);
        }


        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render FeedBack to template defined: ~/Views/Widgets/FeedBack/CustomView || Form.cshtml
        /// Scope: Any where
        /// Example 1:  @{ Html.RenderPartial("~/Views/Default/Widgets/FeedBack/_FormPatial.cshtml", new FeedBack() { Type = "contact-us" });}
        /// Example 2:  @{ Html.RenderPartial("~/Views/Default/Widgets/FeedBack/_FormPatial.cshtml", new FeedBack() { Type = "contact-us", CustomView = "ContactUs" });}
        /// </summary>
        /// <param name="type"></param>
        /// <param name="customView"></param>
        /// <param name="customData"></param>
        public PartialViewResult FeedBack(string type , string customView = "", string customData = "")
        {
            return base.FeedBack(type, customView, customData);
        }
     
        [HttpPost]
        public new PartialViewResult FeedBack(FeedBack feedBack, string annoField, string dataCustom = "")
        {
            return base.FeedBack(feedBack, annoField, dataCustom);
        }



        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Render NewsLetterSubscription to template defined: ~/Views/Widgets/Shared/XXX.cshtml
        /// Scope: Any where
        /// Example 1:  @{ Html.RenderPartial("~/Views/Default/Widgets/Shared/NewsLetterSubscription.cshtml"); }
        /// Example 2:  @{ Html.RenderPartial("~/Views/Default/Widgets/Shared/NewsLetterSubscription_InHouse.cshtml"); }
        /// </summary>
        /// <param name="email"></param>
        /// <param name="fullname"></param>
        /// <param name="phone"></param>
        /// <param name="dateOfBirth"></param>
        /// <param name="gender"></param>
        [HttpPost]
        public new ActionResult NewsLetterSubscription(string email, string fullname = "", string phone = "",
            DateTime? dateOfBirth = null, Gender gender = Gender.Other)
        {
            return base.NewsLetterSubscription(email, fullname, phone, dateOfBirth, gender);
        }


        public new PartialViewResult ListVendor(int groupId, int pid = -1, int did = -1, int page = 1, int pageSize = 15, string pathView = "Vendor/List")
        {
            return base.ListVendor(groupId, pid, did, page, pageSize, pathView);
        }
    }
}