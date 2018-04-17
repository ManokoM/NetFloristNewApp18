using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetFloristNewApp18.Controllers
{
    public class OrderDetails
    {
        public int ord_id { get; set; }
        public string prod_name { get; set; }
        public string prod_desc { get; set; }
        public decimal totalPrice { get; set; }
        public string ord_country { get; set; }
        public string ord_street { get; set; }
        public string ord_city { get; set; }
        public string ord_province { get; set; }
        public string email { get; set; }
        public string ord_status { get; set; }

        public OrderDetails() { }
    }
}