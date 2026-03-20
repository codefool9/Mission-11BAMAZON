// ============================================================================
// DB CONTEXT - This is the "bridge" between your C# code and the SQLite database
// ============================================================================
// WHAT TO DO:
// 1. The DbContext connects Entity Framework to your database
// 2. Each DbSet<T> represents a TABLE in the database
// 3. The DbSet name should match or relate to the table name in the database
//
// HOW IT WORKS:
//   Program.cs registers this context with a connection string
//   --> Controller receives this context via dependency injection
//   --> Controller uses _context.Books to query the database
//
// PATTERN FROM WATERPROJECT:
//   This follows the same pattern as Data/WaterDBContext.cs
//   WaterDBContext had: public DbSet<Project> Projects { get; set; }
//   You need:          public DbSet<Book> Books { get; set; }
// ============================================================================

using Microsoft.EntityFrameworkCore;

namespace Mission_11BAMAZON_.Data
{
    public class BookstoreContext : DbContext
    {
        public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             modelBuilder.Entity<Book>().ToTable("Books");
        }
    }
}
