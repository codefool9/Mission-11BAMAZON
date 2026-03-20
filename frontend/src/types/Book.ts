// ============================================================================
// BOOK TYPE - Matches the JSON that the API returns
// ============================================================================
// C# PascalCase --> JSON camelCase (ASP.NET does this automatically)
//   C# "BookID"         --> JSON "bookID"
//   C# "Title"          --> JSON "title"
//   C# "Classification" --> JSON "classification"
//   etc.
// ============================================================================

export interface Book {
    bookID: number;          // Maps to C# BookID (primary key)
    title: string;           // Maps to C# Title
    author: string;          // Maps to C# Author
    publisher: string;       // Maps to C# Publisher
    isbn: string;            // Maps to C# ISBN
    classification: string;  // Maps to C# Classification
    category: string;        // Maps to C# Category
    pageCount: number;       // Maps to C# PageCount
    price: number;           // Maps to C# Price
}
