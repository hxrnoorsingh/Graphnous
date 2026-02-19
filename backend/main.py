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
    init_db()


@app.get("/")
def root():
    return {"name": "GraphNous API", "version": "0.1.0", "status": "running"}
