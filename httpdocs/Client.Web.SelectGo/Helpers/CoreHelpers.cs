using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ASP.Web.Core.Helpers;
using ASP.Web.Core.Models;
using ASP.Web.Model.Generic;
using ASP.Web.Model.Models;
using ASP.Web.Repositories.Entity;
using ASP.Web.Repositories.Entity.Helpers;

namespace Web.Helpers
{
    public static class Data
    {
        private static readonly IBaseDisplayHelpers Helper = new BaseDisplayHelpers();
        public static string Domain => Helper.Domain();
        public static string SubDomain => Helper.SubDomain();

       
        public static bool IsInRole(string roleName) { return Helper.IsInRole(roleName); }
        public static bool IsInRoleOrAuthenticated(string roleName) { return HttpContext.Current.User.Identity.IsAuthenticated == true || Helper.IsInRole(roleName) ; }
    }

    public static class DisplayHelper
    {
        private static readonly IBaseDisplayHelpers Helper = new BaseDisplayHelpers();
        //
        public static string Favicon => Helper.Favicon();
        public static string StoreName => Helper.StoreName();
        public static string StoreLink => Helper.StoreLink();
        public static string Logo => Helper.Logo();

        public static bool IsInRole(string roleName) { return Helper.IsInRole(roleName);  }
        // public static string Mode => Helper.Mode(); // Debug | Preview
    }

    public static class FormatHelper
    {
        private static readonly IBaseCoreHelpers Helper = new BaseCoreHelpers();
        //
        public static string FormatCurrency(decimal? value = 0) { return Helper.FormatCurrency(value); }

        public static string StandardNumber(int value) { return Helper.StandardNumber(value); }

        public static string FormatDate(DateTime value, string format = "", string neverSet = "Never set")
        {

            var reft = Helper.FormatDate(value, format);
            return reft.Contains("0001") ? neverSet : reft;

        }
        public static string FormatSlug(string value) { return Helper.FormatSlug(value); }

       
    }

    public static class SlugHelper
    {
        private static readonly IBaseCoreHelpers Helper = new BaseCoreHelpers();
        // Manufacturer:
        public static string Manufacturer(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.Manufacturer, id, isShortLink) : Helper.GetUrl(EntityName.Manufacturer, grouped);
        }

        // Page:
        public static string Page(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.Page, id, isShortLink) : Helper.GetUrl(EntityName.Page, grouped);
        }

        // Product:
        //
        public static string Category(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.Category, id, isShortLink) : Helper.GetUrl(EntityName.Category, grouped);
        }

        public static string Product(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.Product, id, isShortLink) : Helper.GetUrl(EntityName.Product, grouped);
        }

        public static string ProductTag(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.ProductTag, id, isShortLink) : Helper.GetUrl(EntityName.ProductTag, grouped);
        }

        public static string ProductInside(int id = 1, string productSlug = "")
        {
            return productSlug.Replace(".html", "/slot-" + id + ".html");
        }

        // Blog:
        //
        public static string BlogCategory(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.BlogCategory, id, isShortLink) : Helper.GetUrl(EntityName.BlogCategory, grouped);
        }

        public static string BlogPost(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.BlogPost, id, isShortLink) : Helper.GetUrl(EntityName.BlogPost, grouped);
        }

        public static string BlogTag(int id = 0, string grouped = "", bool isShortLink = false)
        {
            return grouped == "" ? Helper.GetUrl(EntityName.BlogTag, id, isShortLink) : Helper.GetUrl(EntityName.BlogTag, grouped);
        }

    }

    public static class LanguageHelper
    {
        private static readonly IBaseCoreHelpers Helper = new BaseCoreHelpers();
        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return New Text:In Resources Or Database By params
        /// Scope: Every where
        /// </summary>
        /// <param name="text"></param>
        public static string Translate(string text)
        {
            return Helper.GetResources(text);
        }
    }


    public static class ImageHelper
    {
        private static readonly IBaseCoreHelpers Helper = new BaseCoreHelpers();
        private static ICDNProvider _cndProvider;
        //
        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return New url:Image By params
        /// Scope: Every where
        /// </summary>
        /// <param name="url"></param>
        /// <param name="w"></param>
        /// <param name="h"></param>
        /// <param name="watermark"></param>
        /// http://admin.selectgo.vn/external/api/images/get?url=http://storage.selectgo.vn/media/uploads-1/avatar/product/3000x/2020/07/16/venice-1594876195323.png&namespace=/uploads-1/&indicatedate=2020/07/16&w=200&h=200&compression=100&watermark=
        public static string GetResize(string url, int w = -1, int h = -1, string watermark = "", string sizeDefault = "200x200", long compression = 60L)
        {
            if (url == null) return "";
            //return url;
            if (url.EndsWith(".gif")) return url;
            if (!url.StartsWith(AppConfigs.LinksMedia)) return url;

            var re = (url == "" ? Helper.GetResize("~") : Helper.GetResize(url, w, h, watermark, compression));

            if (_cndProvider == null) _cndProvider = new CDNProvider();
            if (_cndProvider.Initialise("*") != false)
            {
                var newLinksMedia = _cndProvider.GetPreferCnd();
                if (newLinksMedia != AppConfigs.LinksMedia)
                {
                    var rex = re.Replace(AppConfigs.LinksMedia, _cndProvider.GetPreferCnd()); // resover

                    // Cache:
                    var key = "UrlOnline::" + (rex);
                    var vlData = DefaultCacheProvider.Get<string>(key);
                    if (vlData == null)
                    {
                        vlData = _cndProvider.UrlIsOnline(rex) == true ? "OK" : null;
                        DefaultCacheProvider.Add(vlData, key, createFolder: false);
                    }
                    if (vlData == "OK") re = rex;
                }

            }

            if (re.Contains("-1x-1"))
            {
                re = re.Replace("-1x-1", sizeDefault);
            }
            return re;
        }
    }


    public static class DataWhereHelper
    {
        private static readonly IBaseCoreHelpers Helper = new BaseCoreHelpers();

        public static string ExtractScriptsPage(int pageId)
        {
            var scriptsInsert = AppUtils.GetContentCustomJs(pageId.ToString());
            if(scriptsInsert != "" && !scriptsInsert.Contains("Errorcode: 404"))
            return scriptsInsert.Contains("<script>") ? ("" + scriptsInsert + "") : ("<script>" + scriptsInsert + "</script>");
            else
            {
                return "";
            }
        }
        public static string ExtractStylesPage(string stylesInsert)
        {
            if (stylesInsert == null || stylesInsert == "") return "";
            return stylesInsert.Contains("<style>") ? ("" + stylesInsert + "") : ("<style>" + stylesInsert + "</style>");
        }

        public static string ExtractScriptsPage(string scriptsInsert)
        {
            if (scriptsInsert == null || scriptsInsert == "") return "";
            return scriptsInsert.Contains("<script>") ? ("" + scriptsInsert + "") : ("<script>" + scriptsInsert + "</script>");
        }

        public static PresentationImage ExtractImagesCategory(string presentationImages, string name)
        {
            return Helper.GetCategoryImage(presentationImages, name);
        }

        public static List<PresentationImage> ExtractImagesCategory(string presentationImages, string defaultImage, int take)
        {
            var ret = new List<PresentationImage>();
            foreach(var i in Helper.GetCategoryImages(presentationImages).Take(take))
            {
                ret.Add(i);
            }
            if (ret.Count() < take)
                for (var k = ret.Count() + 1; k <= take; k++)
                {
                    ret.Add(new PresentationImage() { Src = defaultImage, Alt = "#" });
                }
            return ret;
        }

        public static string ExtractImagesProduct(ICollection<ProductPictureMapping> productPictureMappings, string avatar, string type = "2nd")
        {
            return Helper.GetProductImage(productPictureMappings, avatar, type);
        }

        //
        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return Single:Picture By params
        /// Scope: Every where
        /// </summary>
        /// <param name="iSlug">I: Identifier, Slug: Url Picture</param>
        /// <param name="urlDefault">{{default}}</param>
        /// <param name="titleDefault">{{default}}</param>
        public static Picture PictureBySlug(string iSlug, string urlDefault = "{{default}}", string titleDefault = "{{default}}")
        {
            return Helper.PictureBySlug(iSlug, urlDefault, titleDefault);
        }


        //
        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return List:BlogPost By params
        /// Scope: Every where
        /// </summary>
        /// <param name="ids">32,323,11</param>
        /// <param name="exceprtId">12</param>
        /// <param name="take">15</param>
        public static List<BlogPost> PostByIds(string ids, int exceprtId = 0, int take = 15)
        {
            return Helper.PostByIds(ids, exceprtId, take);
        }

        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return List:BlogPostCategoryMapping By params
        /// Scope: Every where
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="idSelf"></param>
        /// <param name="take"></param>
        public static List<BlogPostCategoryMapping> PostByCategoryIds(string ids, int idSelf = 0, int take = 15)
        {
            return Helper.PostByCategoryIds(ids, idSelf, take);
        }


        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return List:BlogPostCategoryMapping By params
        /// Scope: Every where
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="idSelf"></param>
        /// <param name="take"></param>
        public static List<Product> ProductByIds(string ids, int idSelf = 0, int take = 15)
        {
            return Helper.ProductByIds(ids, idSelf, take);
        }


        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return List:InsideByProductId By params
        /// Scope: Every where
        /// </summary>
        /// <param name="id"></param>
        /// <param name="take"></param>
        public static List<ProductInsideMapping> InsideByProductId(int id, int take = 7)
        {
            return Helper.InsideByProductId(id, take);
        }

        public static List<ContentImage> ImagesByProductInsideId(int id, string contentImages)
        {
            return Helper.ImagesByProductInsideId(id, contentImages);
        }

        public static List<ProductCategoryMapping> ProductByCategoryIds(string ids, int idSelf = 0, int take = 15)
        {
            return Helper.ProductByCategoryIds(ids, idSelf, take);
        }



        /// <summary>
        /// Frequency of use: Regularly
        /// Function: Return List:BlogCategoryByGroupeds By params
        /// Scope: Every where
        /// </summary>
        /// <param name="groupeds"></param>
        /// <param name="take"></param>
        public static List<BlogCategory> BlogCategoryByGroupeds(string groupeds, int take = 15)
        {
            return Helper.BlogCategoryByGroupeds(groupeds, take);
        }

  

        public static string ProductMetaAttribute(string identifier, ICollection<ProductMetaAttributeMapping> from, string refDefaut = "")
        {
            return Helper.ProductMetaAttribute(identifier, from, refDefaut);
        }

        public static string ProductMetaAttribute(string identifier)
        {
            return Helper.ProductMetaAttribute(identifier, new List<ProductMetaAttributeMapping>(), refDefaut: "UseDefaultContent");
        }

        public static string ProductSpecificationAttribute(string identifier, ICollection<ProductSpecificationAttributeMapping> from, string getField = "Name", string refDefaut = "", int productId = 0)
        {
            return Helper.ProductSpecificationAttribute(identifier, from, getField, refDefaut, productId);
        }

        public static List<string> ProductSpecificationAttributes(string identifier, ICollection<ProductSpecificationAttributeMapping> from, string getField = "Name", string refDefaut = "", int productId = 0)
        {
            return Helper.ProductSpecificationAttributes(identifier, from, getField, refDefaut, productId);
        }
        #region Extract


        // Product:
        public static Category ExtractPrimaryCategory(ICollection<ProductCategoryMapping> productCategoryMappings)
        {
            return Helper.ExtractPrimaryCategory(productCategoryMappings.ToList());
        }

        public static Category ExtractPrimaryCategory(int productId)
        {
            return Helper.ExtractPrimaryCategory(productId);
        }

        public static List<Category> ExtractListProductCategory(ICollection<ProductCategoryMapping> productCategoryMappings)
        {
            return Helper.ExtractListProductCategory(productCategoryMappings.ToList());
        }

        public static List<ProductTag> ExtractListProductTag(ICollection<ProductProductTagMapping> productProductTagMappings)
        {
            return Helper.ExtractListProductTag(productProductTagMappings.ToList());
        }

        public static List<Manufacturer> ExtractListProductManufacturer(ICollection<ProductManufacturerMapping> productManufacturerMappings)
        {
            if (productManufacturerMappings == null) return new List<Manufacturer>();
            return Helper.ExtractListProductManufacturer(productManufacturerMappings.ToList());
        }

        public static List<ProductSpecificationAttributeMapping> ExtractListProductSpecificationAttribute(ICollection<ProductSpecificationAttributeMapping> productSpecificationAttributeMappings)
        {
            return Helper.ExtractListProductSpecificationAttribute(productSpecificationAttributeMappings.ToList());
        }

        public static List<ProductMetaAttributeMapping> ExtractListProductMetaAttribute(ICollection<ProductMetaAttributeMapping> productMetaAttributeMappings)
        {
            return Helper.ExtractListProductMetaAttribute(productMetaAttributeMappings.ToList());
        }

        // Blog:

        public static BlogCategory ExtractPrimaryBlogCategory(ICollection<BlogPostCategoryMapping> blogPostCategoryMappings)
        {
            return Helper.ExtractPrimaryBlogCategory(blogPostCategoryMappings.ToList());
        }

        public static string ExtractIdsBlogCategory(ICollection<BlogPostCategoryMapping> blogPostCategoryMappings)
        {
            return Helper.ExtractIdsBlogCategory(blogPostCategoryMappings.ToList());
        }

        public static List<BlogCategory> ExtractListBlogCategory(ICollection<BlogPostCategoryMapping> blogPostCategoryMappings = null, int? BlogPostId = 0)
        {
            return BlogPostId > 0 ? Helper.ExtractListBlogCategory(new List<BlogPostCategoryMapping>(), BlogPostId) : Helper.ExtractListBlogCategory(blogPostCategoryMappings.ToList());
        }

        public static List<BlogTag> ExtractListBlogTag(ICollection<BlogPostTagMapping> blogPostTagMappings)
        {
            return Helper.ExtractListBlogTag(blogPostTagMappings.ToList());
        }

        public static string ExtractLinkFromHtml(string htmlSource)
        {
            return Helper.GetLinkFromHtml(htmlSource);
        }

        public static VideoModel[] ExtractSourceVideoBlogPostContent(string htmlSource)
        {
            return Helper.ExtractSourceVideoBlogPostContent(htmlSource);
        }

        #endregion

        #region Parse Entity
        public static Category ParseCategory(object data)
        {
            return Helper.ParseCategory(data);
        }
        public static List<FilterOptionView> ParseFilters(object data)
        {
            return Helper.ParseFilters(data);
        }

        public static List<decimal> ParseRangePrices(decimal fromDefault, decimal toDefault, object currentUrlParram)
        {
            return Helper.ParseRangePrices(fromDefault, toDefault, currentUrlParram);
        }
        #endregion

    }

}