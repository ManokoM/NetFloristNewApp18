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
    public class ProductsController : ApiController
    {
        private NewModel db = new NewModel();

        // GET: api/Products
        public IQueryable<Product> GetProducts()
        {
            return db.Products;
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            Console.WriteLine("Hello");
            Product oldDetails = product;


            if (!ModelState.IsValid)
            {
                return BadRequest("Not valid data");
            }


            using (db)
            {
                var prod = db.Products.Where(g => g.prod_id.Equals(id)).FirstOrDefault();
                if (prod != null)
                {
                    prod.prod_name = product.prod_name;
                    prod.prod_price = product.prod_price;
                    prod.prod_type = product.prod_type;
                    prod.prod_desc = product.prod_desc;
                    prod.prod_quantity = product.prod_quantity;
                    prod.prod_threshold = product.prod_threshold;
                    prod.prod_instock = product.prod_instock;

                    var res = db.SaveChanges();

                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = product.prod_id }, product);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.prod_id == id) > 0;
        }

        [Route("api/GetProductImage")]
        public IEnumerable<ProductViewController> GetProductImage()
        {
            PRODUCT_VIEWS image = new PRODUCT_VIEWS();
            var ProductImage = db.Database.SqlQuery<ProductViewController>("SELECT Product.prod_id,Product.prod_name,Product.prod_price, Product.prod_desc,ProImage.Image FROM Product INNER JOIN ProImage ON Product.prod_id=ProImage.prod_id ORDER BY Product.prod_name ASC");
            return ProductImage;
        }
    }
}