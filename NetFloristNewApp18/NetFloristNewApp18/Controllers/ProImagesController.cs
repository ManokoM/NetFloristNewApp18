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
using System.Web;
using System.IO;

namespace NetFloristNewApp18.Controllers
{
    public class ProImagesController : ApiController
    {
        private NetFloristNewApp18dbEntities2 db = new NetFloristNewApp18dbEntities2();

        // GET: api/ProImages
        public IQueryable<ProImage> GetProImages()
        {
            return db.ProImages;
        }

        // GET: api/ProImages/5
        [ResponseType(typeof(ProImage))]
        public IHttpActionResult GetProImage(int id)
        {
            ProImage proImage = db.ProImages.Find(id);
            if (proImage == null)
            {
                return NotFound();
            }

            return Ok(proImage);
        }

        // PUT: api/ProImages/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProImage(int id, ProImage proImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != proImage.img_id)
            {
                return BadRequest();
            }

            db.Entry(proImage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProImageExists(id))
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

        // POST: api/ProImages
        public String POST()
        {
            int counter = 0;

            //COLLECTING FILES------->
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            ProImage picfun = new ProImage();
            var prod_id = db.Products.Select(i => i).ToArray().LastOrDefault();
            String Status = "";
            for (int i = 0; i < files.Count; i++)
            {

                //GET THE POSTED FILES------>
                System.Web.HttpPostedFile file = files[i];

                string fileName = new FileInfo(file.FileName).Name;


                if (file.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();

                    string modifiedFileName = id.ToString() + "_" + fileName;

                    byte[] imageb = new byte[file.ContentLength];
                    file.InputStream.Read(imageb, 0, file.ContentLength);
                    picfun.img_id = new Random().Next();
                    picfun.Image = imageb;
                    picfun.prod_id = Convert.ToInt32(prod_id.prod_id.ToString());
                    // picfun.Image = imageb;
                    db.ProImages.Add(picfun);
                    db.SaveChanges();
                    counter++;

                }

            }

            if (counter > 0)
            {
                return Status;
            }
            return "Upload Failed";
        }

        // DELETE: api/ProImages/5
        [ResponseType(typeof(ProImage))]
        public IHttpActionResult DeleteProImage(int id)
        {
            ProImage proImage = db.ProImages.Find(id);
            if (proImage == null)
            {
                return NotFound();
            }

            db.ProImages.Remove(proImage);
            db.SaveChanges();

            return Ok(proImage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProImageExists(int id)
        {
            return db.ProImages.Count(e => e.img_id == id) > 0;
        }
    }
}