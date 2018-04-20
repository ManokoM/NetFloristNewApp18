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
    public class TablesController : ApiController
    {
        private NetFloristNewApp18dbEntities2 db = new NetFloristNewApp18dbEntities2();

        // GET: api/Tables
        public IQueryable<Table> GetTables()
        {
            return db.Tables;
        }

        // GET: api/Tables/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult GetTable(string email, string password)
        {
            Table cust = db.Tables.Where(adm => adm.email.Equals(email) &&
                adm.password.Equals(password)).FirstOrDefault();
            if (email == null && password == null)
            {
                return (null);
            }
            else
            {
                return Ok(cust);
            }

        }

        // PUT: api/Tables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTable(string id, Table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != table.email)
            {
                return BadRequest();
            }

            db.Entry(table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableExists(id))
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

        // POST: api/Tables
        [ResponseType(typeof(Table))]
        public IHttpActionResult PostTable(Table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tables.Add(table);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TableExists(table.email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = table.email }, table);
        }

        // DELETE: api/Tables/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult DeleteTable(string id)
        {
            Table table = db.Tables.Find(id);
            if (table == null)
            {
                return NotFound();
            }

            db.Tables.Remove(table);
            db.SaveChanges();

            return Ok(table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TableExists(string id)
        {
            return db.Tables.Count(e => e.email == id) > 0;
        }
    }
}