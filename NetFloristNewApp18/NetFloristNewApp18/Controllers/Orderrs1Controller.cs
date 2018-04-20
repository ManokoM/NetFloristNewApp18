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
    public class Orderrs1Controller : ApiController
    {
        private NetFloristNewApp18dbEntities2 db = new NetFloristNewApp18dbEntities2();

        // GET: api/Orderrs1
        public IQueryable<Orderr> GetOrderrs()
        {
            return db.Orderrs;
        }

        // GET: api/Orderrs1/5
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

        // PUT: api/Orderrs1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrderr(int id, Orderr orderr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderr.ord_id)
            {
                return BadRequest();
            }

            db.Entry(orderr).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderrExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Orderrs1
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

        // DELETE: api/Orderrs1/5
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