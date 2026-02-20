"""GraphNous Backend — FastAPI application."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from database import init_db
from routers import decisions, search, graph, drift

app = FastAPI(
    title="GraphNous API",
    description="Cognitive infrastructure for organizational decision memory",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(decisions.router)
app.include_router(search.router)
app.include_router(graph.router)
app.include_router(drift.router)
# assistant router removed


@app.on_event("startup")
def startup():
    try:
        init_db()
    except Exception as e:
        print(f"Startup DB Init failed: {e}")

@app.get("/api/debug/db")
def debug_db():
    try:
        from database import get_db
        conn = get_db()
        tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
        table_names = [row["name"] for row in tables]
        conn.close()
        return {"status": "ok", "tables": table_names}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@app.post("/api/debug/init-db")
def manual_init_db():
    try:
        init_db()
        return {"status": "initialized"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}



@app.get("/")
def root():
    return {"name": "GraphNous API", "version": "0.1.0", "status": "running"}
