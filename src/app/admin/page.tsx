"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { getAdminData, updateStockAction } from "./actions";
import { Plus, Minus, Lock, Package, ListOrdered, RefreshCw, LogOut } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const auth = sessionStorage.getItem("vrnda_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    const data = await getAdminData();
    if (data.success) {
      setProducts(data.products || []);
      setOrders(data.orders || []);
    } else {
      setError(data.error || "Failed to load database records.");
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "vrinda_admin_2026") {
      setIsAuthenticated(true);
      setError("");
      sessionStorage.setItem("vrnda_admin_auth", "true");
      fetchData();
    } else {
      setError("Incorrect administrator credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("vrnda_admin_auth");
  };

  const handleAdjustStock = async (slug: string, currentStock: number, diff: number) => {
    const newStock = Math.max(0, currentStock + diff);
    
    // Optimistic UI update
    setProducts(prev => 
      prev.map(p => p.slug === slug ? { ...p, stockQuantity: newStock } : p)
    );

    startTransition(async () => {
      const res = await updateStockAction(slug, newStock);
      if (!res.success) {
        // Revert on failure
        setProducts(prev => 
          prev.map(p => p.slug === slug ? { ...p, stockQuantity: currentStock } : p)
        );
        alert(res.error || "Failed to update stock quantity.");
      }
    });
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center bg-[#faf8f5] py-12">
        <RefreshCw className="w-8 h-8 text-[#1f3f21] animate-spin" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#8c6239] mt-4">Loading Dashboard...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#faf8f5] px-6 py-12">
        <div className="max-w-md w-full bg-white border border-[#8c6239]/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c6239] block">
              Vṛndā Administration
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#1f3f21]">
              Secure Gatehouse
            </h1>
            <p className="text-xs text-[#2c2c2c]/60 max-w-[280px] mx-auto leading-relaxed">
              Please enter your administrator key to access catalog inventory controls and client order ledgers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label htmlFor="password-field" className="block text-[10px] font-bold uppercase text-[#2c2c2c]/50 tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="password-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full px-4 py-3 bg-[#faf8f5] border border-[#8c6239]/15 rounded-2xl text-sm focus:outline-none focus:border-[#1f3f21] text-[#2c2c2c] transition-colors placeholder:text-gray-300"
                  required
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c6239]/40" />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-center text-xs font-semibold leading-relaxed">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8c6239] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Authenticate Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-[#8c6239]/15 p-6 rounded-3xl shadow-sm gap-4">
          <div className="flex items-center gap-4">
            {/* Admin Avatar styled in a black suit */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#8c6239]/20 bg-gray-100 flex-shrink-0">
              <Image 
                src="/images/admin_avatar.jpg" 
                alt="Admin Avatar" 
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239] block">
                Administrative Workspace
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1f3f21]">
                Master Inventory & Sales Ledgers
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-3 bg-[#faf8f5] hover:bg-[#f7f2e9] text-[#1f3f21] border border-[#8c6239]/15 rounded-2xl transition-colors disabled:opacity-50"
              aria-label="Refresh Data"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-2xl border border-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column Left: Product Inventory (5 Columns wide on large screens) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#8c6239]/15 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#8c6239]/10 pb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#8c6239]" />
                  <h3 className="font-serif text-lg font-bold text-[#1f3f21]">
                    Inventory Control Panel
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-[#1f3f21]/10 text-[#1f3f21] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {products.length} Items Listed
                </span>
              </div>

              <div className="divide-y divide-[#8c6239]/10">
                {products.map((product) => (
                  <div key={product.slug} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#2c2c2c]">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[#8c6239] font-bold">
                          ₹ {product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-400 select-none">
                          slug: {product.slug}
                        </span>
                      </div>
                    </div>

                    {/* Stock Adjustment Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAdjustStock(product.slug, product.stockQuantity, -1)}
                        disabled={product.stockQuantity <= 0 || isPending}
                        className="p-2 border border-[#8c6239]/15 bg-[#faf8f5] rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                        aria-label="Decrease Stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-12 text-center">
                        <span className={`text-sm font-extrabold ${product.stockQuantity === 0 ? "text-red-600 animate-pulse" : "text-[#1f3f21]"}`}>
                          {product.stockQuantity}
                        </span>
                        <span className="block text-[8px] uppercase tracking-wider text-[#2c2c2c]/40 font-bold mt-0.5">
                          Stock
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdjustStock(product.slug, product.stockQuantity, 1)}
                        disabled={isPending}
                        className="p-2 border border-[#8c6239]/15 bg-[#faf8f5] rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors disabled:opacity-30"
                        aria-label="Increase Stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column Right: Order Ledgers (7 Columns wide on large screens) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#8c6239]/15 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#8c6239]/10 pb-4">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-[#8c6239]" />
                  <h3 className="font-serif text-lg font-bold text-[#1f3f21]">
                    E-Commerce Orders Log
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-[#8c6239]/10 text-[#8c6239] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {orders.length} Records Found
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <p className="text-sm font-semibold text-[#2c2c2c]/50">
                    No checkout transactions found.
                  </p>
                  <p className="text-xs text-[#2c2c2c]/40 max-w-[240px] mx-auto leading-relaxed">
                    Once client transactions are authorized via Razorpay, payment logs will be displayed here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#8c6239]/10 text-[10px] uppercase tracking-wider text-[#2c2c2c]/40 font-bold">
                        <th className="py-3 px-2">Order Info</th>
                        <th className="py-3 px-2">Client Details</th>
                        <th className="py-3 px-2">Items</th>
                        <th className="py-3 px-2 text-right">Sum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#8c6239]/10 text-xs">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#faf8f5]/50 transition-colors">
                          <td className="py-4 px-2 space-y-1">
                            <span className="font-mono text-[10px] block font-bold text-[#2c2c2c]">
                              #{order.id.slice(0, 8)}
                            </span>
                            <span className="text-[9px] text-[#2c2c2c]/50 block">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                            <span className={`inline-block text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              order.status === "paid" 
                                ? "bg-green-50 text-green-700 border border-green-200" 
                                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            }`}>
                              {order.status}
                            </span>
                          </td>

                          <td className="py-4 px-2 space-y-1 text-[#2c2c2c]/75">
                            <span className="font-bold text-[#2c2c2c] block">{order.customerDetails?.name}</span>
                            <span className="block text-[10px]">{order.customerDetails?.email}</span>
                            <span className="block text-[10px]">{order.customerDetails?.phone}</span>
                            <span className="block text-[10px] text-[#2c2c2c]/50 max-w-[180px] truncate" title={`${order.customerDetails?.address}, ${order.customerDetails?.city} - ${order.customerDetails?.pincode}`}>
                              {order.customerDetails?.address}, {order.customerDetails?.city}
                            </span>
                          </td>

                          <td className="py-4 px-2 text-[#2c2c2c]/70 font-semibold space-y-1">
                            {Array.isArray(order.items) ? (
                              order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between gap-2 max-w-[160px]">
                                  <span className="truncate">{item.name}</span>
                                  <span className="text-[#8c6239] font-bold text-[10px] flex-shrink-0">x{item.quantity}</span>
                                </div>
                              ))
                            ) : (
                              <span>N/A</span>
                            )}
                          </td>

                          <td className="py-4 px-2 text-right font-bold text-[#1f3f21] font-serif">
                            ₹ {order.amount.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
