using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Web.Helpers;
using ASP.Web.Repositories.Entity.Infrastructure;

namespace Web.Api
{
    [AllowAnonymous]
    public class HelperController : ApiController
    {
        
        [HttpGet]
        public object Tags(string value)
        {

            var list = new List<string>();
            var v = value.ToLower();
            using (var nb = new NbContext())
            {
                var listsps = nb.ProductTags.AsNoTracking().Where(e => e.Name.ToLower().Contains(v) && e.IsDeleted != true).ToList();
                foreach (var sp in listsps)
                {
                    list.Add(sp.Name);
                }
            }

            return list;

        }

        [HttpGet]
        public object TagsSearch(string value = "")
        {

            var list = new List<object>();
            var v = value.ToLower();
            using (var nb = new NbContext())
            {
                var listsps = nb.ProductTags.Include("ProductProductTagMappings").AsNoTracking().Where(e => e.Name.ToLower().Contains(v) && e.IsDeleted != true).ToList();

                foreach (var sp in listsps)
                {
                    list.Add(new { link= SlugHelper.ProductTag(sp.Id), code= sp.Id, name = sp.Name, type = sp.ProductProductTagMappings.Count() > 3 ? "favorite" : "" });
                }
            }

            return list;

        }


    }

}