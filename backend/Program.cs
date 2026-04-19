using Microsoft.EntityFrameworkCore;
using Mission_11BAMAZON_.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Use the content root path for the SQLite database — works both locally and on Azure
var dbPath = Path.Combine(builder.Environment.ContentRootPath, "Bookstore.sqlite");

builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:3000"];

builder.Services.AddCors(options =>
     options.AddPolicy("AllowReactApp",
         policy => policy.WithOrigins(allowedOrigins)
             .AllowAnyMethod()
             .AllowAnyHeader()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
