// ============================================================================
// BOOK MODEL - Maps exactly to the "Books" table in Bookstore.sqlite
// ============================================================================
// Database columns (from the .sqlite file):
//   BookID (INTEGER, PK) | Title (TEXT) | Author (TEXT) | Publisher (TEXT)
//   ISBN (TEXT) | Classification (TEXT) | Category (TEXT) | PageCount (INTEGER) | Price (REAL)
// ============================================================================

using System.ComponentModel.DataAnnotations;

namespace Mission_11BAMAZON_.Data
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }          // PRIMARY KEY - matches DB column "BookID"

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Author { get; set; } = string.Empty;

        [Required]
        public string Publisher { get; set; } = string.Empty;

        [Required]
        public string ISBN { get; set; } = string.Empty;

        [Required]
        public string Classification { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public int PageCount { get; set; }       // matches DB column "PageCount"

        [Required]
        public double Price { get; set; }        // matches DB column "Price"
    }
}
