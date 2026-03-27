using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission_11BAMAZON_.Data;

namespace Mission_11BAMAZON_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookstoreContext _bookContext;

        public BookController(BookstoreContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null, string? category = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(b => b.Category == category);

            if (sortBy == "title")
                query = query.OrderBy(b => b.Title);

            var totalNumBooks = query.Count();

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { Books = books, TotalNumBooks = totalNumBooks });
        }

        [HttpGet("Categories")]
        public IActionResult GetCategories()
        {
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToList();
            return Ok(categories);
        }
    }
}
