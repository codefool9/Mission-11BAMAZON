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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null)
        {
               var query = _bookContext.Books.AsQueryable();
            
               if (sortBy == "title")
               {
                   query = query.OrderBy(b => b.Title);
               }

               var books = query
                   .Skip((pageNum - 1) * pageSize)
                   .Take(pageSize)
                   .ToList();

               var totalNumBooks = _bookContext.Books.Count();

               return Ok(new
               {
                   Books = books,
                   TotalNumBooks = totalNumBooks
               });
        }
    }
}
