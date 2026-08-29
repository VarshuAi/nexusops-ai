import { CodeSnippetSample } from '../types/repository';

export const BENCHMARK_SNIPPETS: CodeSnippetSample[] = [
  {
    id: 'nextjs-auth-cve',
    name: 'Next.js 15 JWT Auth & Session Route',
    category: 'Full-Stack',
    language: 'typescript',
    filename: 'src/app/api/auth/session/route.ts',
    description: 'Contains broken token verification (none algorithm exploit), hardcoded secret fallback, and timing side-channel on password check.',
    expectedIssues: [
      'CWE-347: Improper Verification of Cryptographic Signature (JWT alg: none allowed)',
      'CWE-798: Use of Hardcoded Credentials in fallback secret',
      'CWE-208: Observable Timing Discrepancy in string comparison',
      'Memory leak in unbounded global token revocation cache'
    ],
    code: `import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// INSECURE: Hardcoded fallback secret
const JWT_SECRET = process.env.AUTH_SECRET || "super_secret_fallback_key_123!";
const activeSessions = new Map<string, any>(); // UNBOUNDED: Memory leak risk

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, userQuery } = body;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // VULNERABILITY 1: Allows algorithm 'none' or unsanitized algorithms
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256", "none"] as any,
    }) as { userId: string; role: string };

    // VULNERABILITY 2: Timing attack vulnerable comparison
    if (decoded.role === "SUPER_ADMIN" && body.adminKey === "MASTER_ROOT_KEY_9988") {
      activeSessions.set(decoded.userId, { ...decoded, elevatedAt: Date.now() });
    }

    // VULNERABILITY 3: SQL Injection risk if passed directly to raw query
    const rawSql = \`SELECT * FROM users WHERE id = '\${decoded.userId}' AND metadata LIKE '%\${userQuery}%'\`;

    return NextResponse.json({
      authenticated: true,
      user: decoded,
      debugQuery: rawSql,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}`
  },
  {
    id: 'fastapi-sql-race',
    name: 'Python FastAPI Order Processing Service',
    category: 'Backend API',
    language: 'python',
    filename: 'services/order_service.py',
    description: 'Contains SQL Injection via f-strings, race condition on inventory deduction, and missing async connection pool release.',
    expectedIssues: [
      'CWE-89: SQL Injection in dynamic query concatenation',
      'CWE-362: Concurrent Execution using Shared Resource with Improper Synchronization (TOCTOU)',
      'CWE-400: Uncontrolled Resource Consumption (unclosed DB cursor)',
      'Missing Pydantic schema validation'
    ],
    code: `from fastapi import FastAPI, HTTPException, Depends
import psycopg2
import asyncio
from typing import Optional

app = FastAPI(title="OrderProcessingEngine")

conn = psycopg2.connect("postgresql://admin:secret@db.internal:5432/orders")

@app.post("/api/v1/checkout")
async def checkout_order(user_id: str, item_id: str, quantity: int, coupon: Optional[str] = None):
    cursor = conn.cursor()
    try:
        query = f"SELECT stock, price FROM inventory WHERE id = '{item_id}'"
        if coupon:
            query += f" AND active_coupon = '{coupon}'"
        
        cursor.execute(query)
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="Item or coupon invalid")
        
        stock, price = result
        
        if stock < quantity:
            raise HTTPException(status_code=400, detail="Insufficient inventory stock")
        
        await asyncio.sleep(0.05)
        
        cursor.execute(f"UPDATE inventory SET stock = stock - {quantity} WHERE id = '{item_id}'")
        cursor.execute(f"INSERT INTO orders (user_id, item_id, qty) VALUES ('{user_id}', '{item_id}', {quantity})")
        conn.commit()
        
        return {"status": "SUCCESS", "total_charged": price * quantity}
    finally:
        cursor.close()
`
  }
];
