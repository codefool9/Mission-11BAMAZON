import { useEffect, useState } from "react";
import type { Book } from './types/Book';

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string | null>(null);

    useEffect(() => {
         const fetchBooks = async () => {
             const sortParam = sortBy ? `&sortBy=${sortBy}` : '';
            const response = await fetch(
                `http://localhost:4000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${sortParam}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };    
        fetchBooks();
    }, [pageSize, pageNum, sortBy]);

    return (
        <>
            <button className="btn btn-success mb-3"
                onClick={() => setSortBy(sortBy === "title" ? null : "title")}>
                {sortBy === "title" ? "Clear Sort" : "Sort by Title"}
            </button>

            {books.map((b) => (
                <div className="card mb-3" key={b.bookID}>
                    <div className="card-body">
                        <h5 className="card-title">{b.title}</h5>
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                        </ul>
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-center gap-2 mb-3">
                <button className="btn btn-primary"
                    disabled={pageNum === 1}
                    onClick={() => setPageNum(pageNum - 1)}>
                    Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        key={i + 1}
                        onClick={() => setPageNum(i + 1)}
                        disabled={pageNum === i + 1}>
                        {i + 1}
                    </button>
                ))}

                <button className="btn btn-primary"
                    disabled={pageNum === totalPages}
                    onClick={() => setPageNum(pageNum + 1)}>
                    Next
                </button>
            </div>

            <div className="d-flex justify-content-center mb-3">
                <label className="me-2">Results per page:</label>
                <select className="form-select w-auto"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNum(1);
                    }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </>
    );
}

export default BookList;
