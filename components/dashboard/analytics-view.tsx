import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MousePointerClick, TrendingUp, Calendar } from "lucide-react";

interface AnalyticsViewProps {
    dailyStats: any[];
}

export function AnalyticsView({ dailyStats }: AnalyticsViewProps) {
    const data = useMemo(() => {
        // Ensure data is sorted by date ascending
        const sorted = [...dailyStats].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return sorted.map(stat => ({
            name: new Date(stat.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            date: new Date(stat.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
            views: stat.views,
            clicks: stat.clicks,
        }));
    }, [dailyStats]);

    const totals = useMemo(() => {
        return dailyStats.reduce((acc, curr) => ({
            views: acc.views + curr.views,
            clicks: acc.clicks + curr.clicks
        }), { views: 0, clicks: 0 });
    }, [dailyStats]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-zinc-400">Total Views (Recent)</p>
                            <Eye className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div className="text-2xl font-bold text-white">{totals.views}</div>
                        <p className="text-xs text-zinc-500 mt-1">
                            In the last 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-zinc-400">Total Interactions</p>
                            <MousePointerClick className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div className="text-2xl font-bold text-white">{totals.clicks}</div>
                        <p className="text-xs text-zinc-500 mt-1">
                            Widget opens & clicks
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-zinc-400">Interaction Rate</p>
                            <TrendingUp className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {totals.views > 0 ? ((totals.clicks / totals.views) * 100).toFixed(1) : 0}%
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                            Clicks per view
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Traffic Chart */}
            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        Traffic Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="pl-0">
                    <div className="h-[350px] w-full">
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#4f46e5" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#71717a"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        stroke="#71717a"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ fontSize: '13px', fontWeight: 500, padding: '2px 0' }}
                                        labelStyle={{ color: '#a1a1aa', marginBottom: '8px', fontSize: '12px' }}
                                    />
                                    <Bar
                                        dataKey="views"
                                        name="Page Views"
                                        fill="url(#viewsGradient)"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={50}
                                    />
                                    <Bar
                                        dataKey="clicks"
                                        name="Interactions"
                                        fill="url(#clicksGradient)"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={50}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                                <p>No data available yet</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
