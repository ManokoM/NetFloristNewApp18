//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace NetFloristNewApp18.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            this.ProImages = new HashSet<ProImage>();
        }
    
        public int prod_id { get; set; }
        public string prod_name { get; set; }
        public decimal prod_price { get; set; }
        public string prod_type { get; set; }
        public string prod_desc { get; set; }
        public int prod_quantity { get; set; }
        public int prod_threshold { get; set; }
        public Nullable<int> prod_instock { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProImage> ProImages { get; set; }
    }
}
