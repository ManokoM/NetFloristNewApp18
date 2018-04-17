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
    public class suppliersController : ApiController
    {
        private NewModel db = new NewModel();

        // GET: api/suppliers
        public IQueryable<supplier> Getsuppliers()
        {
            return db.suppliers;
        }

        // GET: api/suppliers/5
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Getsupplier(string s_email, string s_password)
        {
            supplier supp = db.suppliers.Where(adm => adm.s_email.Equals(s_email) &&
                adm.s_password.Equals(s_password)).FirstOrDefault();
            if (s_email == null && s_password == null)
            {
                return (null);
            }
            else
            {
                return Ok(supp);
            }

        }


        // PUT: api/suppliers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsupplier(int id, supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.supp_id)
            {
                return BadRequest();
            }

            db.Entry(supplier).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!supplierExists(id))
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

        // POST: api/suppliers
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Postsupplier(supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.suppliers.Add(supplier);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (supplierExists(supplier.supp_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = supplier.supp_id }, supplier);
        }

        // DELETE: api/suppliers/5
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Deletesupplier(int id)
        {
            supplier supplier = db.suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            db.suppliers.Remove(supplier);
            db.SaveChanges();

            return Ok(supplier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool supplierExists(int id)
        {
            return db.suppliers.Count(e => e.supp_id == id) > 0;
        }
    }
}