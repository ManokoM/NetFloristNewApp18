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
    public class DriversController : ApiController
    {
        private NewModel db = new NewModel();

        // GET: api/Drivers
        public IQueryable<Driver> GetDrivers()
        {
            return db.Drivers;
        }

        // GET: api/Drivers/5
        [ResponseType(typeof(Driver))]
        public IHttpActionResult GetDriver(string d_email, string d_password)
        {
            Driver drv = db.Drivers.Where(adm => adm.d_email.Equals(d_email) && adm.d_password.Equals(d_password)).FirstOrDefault();
            if (d_email == null && d_password == null)
            {
                return (null);
            }
            else
            {
                return Ok(drv);
            }
        }


        // PUT: api/Drivers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDriver(int id, Driver driver)
        {
            Console.WriteLine("Hello");
            Driver oldDetails = driver;


            if (!ModelState.IsValid)
            {
                return BadRequest("Not valid data");
            }


            using (db)
            {
                var drvr = db.Drivers.Where(g => g.d_id.Equals(id)).FirstOrDefault();
                if (drvr != null)
                {
                    drvr.d_firstname = driver.d_firstname;
                    drvr.d_lastname = driver.d_lastname;
                    drvr.d_cell = driver.d_cell;
                    drvr.d_email = driver.d_email;
                    drvr.d_password = driver.d_password;

                    var res = db.SaveChanges();

                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        // POST: api/Drivers
        [ResponseType(typeof(Driver))]
        public IHttpActionResult PostDriver(Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Drivers.Add(driver);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = driver.d_id }, driver);
        }

        // DELETE: api/Drivers/5
        [ResponseType(typeof(Driver))]
        public IHttpActionResult DeleteDriver(int id)
        {
            Driver driver = db.Drivers.Find(id);
            if (driver == null)
            {
                return NotFound();
            }

            db.Drivers.Remove(driver);
            db.SaveChanges();

            return Ok(driver);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DriverExists(int id)
        {
            return db.Drivers.Count(e => e.d_id == id) > 0;
        }
    }
}