// I defined this interface to match the JSON shape my ASP.NET API returns —
// keeping the types in sync here means TypeScript will catch any mismatches at compile time
export interface Book {
    bookID: number;          // Maps to my C# BookID (primary key)
    title: string;           // Maps to my C# Title
    author: string;          // Maps to my C# Author
    publisher: string;       // Maps to my C# Publisher
    isbn: string;            // Maps to my C# ISBN
    classification: string;  // Maps to my C# Classification
    category: string;        // Maps to my C# Category
    pageCount: number;       // Maps to my C# PageCount
    price: number;           // Maps to my C# Price
}
