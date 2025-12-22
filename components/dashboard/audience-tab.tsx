"use client";

import { useState } from "react";
import { Download, Search, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AudienceTabProps {
    subscribers: any[];
}

export function AudienceTab({ subscribers }: AudienceTabProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter subscribers
    const filteredSubscribers = subscribers.filter((sub) =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // CSV Download
    const downloadCSV = () => {
        const headers = ["Email", "Joined Date", "Status"];
        const rows = filteredSubscribers.map((sub) => [
            sub.email,
            new Date(sub.createdAt).toLocaleDateString(),
            "Subscribed",
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "logpulse_subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-zinc-900/50 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            Total Audience
                        </CardTitle>
                        <Users className="h-4 w-4 text-zinc-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{subscribers.length}</div>
                        <p className="text-xs text-zinc-500 mt-1">Total subscribed users</p>
                    </CardContent>
                </Card>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search emails..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:ring-zinc-700"
                    />
                </div>
                <Button variant="outline" onClick={downloadCSV} className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-900/80">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-zinc-400">Subscriber</TableHead>
                            <TableHead className="text-zinc-400">Joined</TableHead>
                            <TableHead className="text-zinc-400 text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubscribers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-32 text-center">
                                    <div className="flex flex-col items-center gap-2 text-zinc-500">
                                        <Mail className="h-8 w-8 opacity-50" />
                                        <p>No subscribers found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSubscribers.map((sub) => (
                                <TableRow key={sub.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="font-medium text-zinc-200">
                                        {sub.email}
                                    </TableCell>
                                    <TableCell className="text-zinc-400">
                                        {new Date(sub.createdAt).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-none">
                                            Subscribed
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
