using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using NetFloristNewApp18.Models;

namespace NetFloristNewApp18.Controllers
{
    public class OrderrsController : ApiController
    {
        private NewModel db = new NewModel();

        // GET: api/Orderrs
        public IQueryable<Orderr> GetOrderrs()
        {
            return db.Orderrs;
        }

        // GET: api/Orderrs/5
        [ResponseType(typeof(Orderr))]
        public IHttpActionResult GetOrderr(int id)
        {
            Orderr orderr = db.Orderrs.Find(id);
            if (orderr == null)
            {
                return NotFound();
            }

            return Ok(orderr);
        }

        // PUT: api/Orderrs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrderr(int id, Orderr order)
        {

            Console.WriteLine("Hello");
            Orderr oldDetails = order;


            if (!ModelState.IsValid)
            {
                return BadRequest("Not valid data");
            }


            using (db)
            {
                var cust = db.Orderrs.Where(g => g.ord_id.Equals(id)).FirstOrDefault();
                if (cust != null)
                {
                    cust.totalPrice = order.totalPrice;
                    cust.ord_country = order.ord_country;
                    cust.ord_street = order.ord_street;
                    cust.ord_city = order.ord_city;
                    cust.ord_province = order.ord_province;
                    cust.email = order.email;
                    cust.ord_status = order.ord_status;
                    cust.ord_deliveryStatus = order.ord_deliveryStatus;

                    var res = db.SaveChanges();

                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        // POST: api/Orderrs
        [ResponseType(typeof(Orderr))]
        public IHttpActionResult PostOrderr(Orderr orderr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orderrs.Add(orderr);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = orderr.ord_id }, orderr);
        }

        // DELETE: api/Orderrs/5
        [ResponseType(typeof(Orderr))]
        public IHttpActionResult DeleteOrderr(int id)
        {
            Orderr orderr = db.Orderrs.Find(id);
            if (orderr == null)
            {
                return NotFound();
            }

            db.Orderrs.Remove(orderr);
            db.SaveChanges();

            return Ok(orderr);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderrExists(int id)
        {
            return db.Orderrs.Count(e => e.ord_id == id) > 0;
        }

        [Route("api/GetDriverOrders")]
        public IEnumerable<DriversOrderss_Details> getOrders()
        {
            Drivers_Orderss_Result oj = new Drivers_Orderss_Result();
            var result = db.Database.SqlQuery<DriversOrderss_Details>("SELECT ord_id, totalPrice, ord_country,ord_street,ord_city,ord_province, email, ord_status, ord_deliveryStatus FROM dbo.[Orderr] WHERE ord_status = 'Ready for pick up'");

            return result;
        }
    }
}