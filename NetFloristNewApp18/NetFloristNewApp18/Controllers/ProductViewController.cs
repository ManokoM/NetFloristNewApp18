using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NetFloristNewApp18.Controllers
{
    public class ProductViewController : ApiController
    {
        public int prod_id { get; set; }
        public string prod_name { get; set; }
        public decimal prod_price { get; set; }
        public byte[] Image { get; set; }
        public string prod_desc { get; set; }

        public ProductViewController()
        {

        }
    }
}
