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
    public class Ord_TblController : ApiController
    {
        private NetFloristNewApp18dbEntities2 db = new NetFloristNewApp18dbEntities2();

        // GET: api/Ord_Tbl
        public IQueryable<Ord_Tbl> GetOrd_Tbl()
        {
            return db.Ord_Tbl;
        }

        // GET: api/Ord_Tbl/5
        [ResponseType(typeof(Ord_Tbl))]
        public IHttpActionResult GetOrd_Tbl(int id)
        {
            Ord_Tbl ord_Tbl = db.Ord_Tbl.Find(id);
            if (ord_Tbl == null)
            {
                return NotFound();
            }

            return Ok(ord_Tbl);
        }

        // PUT: api/Ord_Tbl/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrd_Tbl(int id, Ord_Tbl ord_Tbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ord_Tbl.op_id)
            {
                return BadRequest();
            }

            db.Entry(ord_Tbl).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Ord_TblExists(id))
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

        // POST: api/Ord_Tbl
        [ResponseType(typeof(Ord_Tbl))]
        public IHttpActionResult PostOrd_Tbl(Ord_Tbl ord_Tbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ord_Tbl.Add(ord_Tbl);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ord_Tbl.op_id }, ord_Tbl);
        }

        // DELETE: api/Ord_Tbl/5
        [ResponseType(typeof(Ord_Tbl))]
        public IHttpActionResult DeleteOrd_Tbl(int id)
        {
            Ord_Tbl ord_Tbl = db.Ord_Tbl.Find(id);
            if (ord_Tbl == null)
            {
                return NotFound();
            }

            db.Ord_Tbl.Remove(ord_Tbl);
            db.SaveChanges();

            return Ok(ord_Tbl);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Ord_TblExists(int id)
        {
            return db.Ord_Tbl.Count(e => e.op_id == id) > 0;
        }


        // Defining and calling the stored procedure
        [Route("api/GetOrders")]
        public IEnumerable<OrderDetails> getInfo()
        {
            GetAllOrdersss_Result oj = new GetAllOrdersss_Result();
            var result = db.Database.SqlQuery<OrderDetails>("SELECT o.ord_id, prod_name, prod_desc, totalPrice, c.email, ord_country,ord_street, ord_city,ord_province, ord_deliveryStatus FROM dbo.[Orderr] o, dbo.[Product]  P, dbo.[Ord_Tbl] op, dbo.[Table] c WHERE o.ord_id = op.order_id and P.prod_id = op.pro_id and c.email = o.email");

            return result;
        }
    }
}