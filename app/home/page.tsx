'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

import { User } from '@supabase/supabase-js';
import { useTour } from '@/context/TourContext';
import { useExpenseData } from '@/hooks/use-expense-data';
import { MascotSection } from '@/components/home/MascotSection';
import BudgetRingsD3 from '@/components/charts/BudgetRingsD3';
import { formatCurrency } from '@/lib/d3-utils';
import { ExpenseTarget } from '@/types';
import { HomeView } from '@/components/screens/HomeView';

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const { expenses, budget, loading } = useExpenseData();
    const { isTourActive } = useTour();

    // -- Authentication Check --
    useEffect(() => {
        // If tour is active, we don't strictly require a user
        // BUT wait, we are reverting that. The USER wants strict separation.
        // So this page SHOULD redirect if not logged in.
        // If tour is active, we should NOT BE ON THIS PAGE. We should be on /tour/home.
        // So I revert the tour check.
        // if (isTourActive) return;

        const supabase = createClient();
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
            }
        };
        checkUser();
    }, [router]);

    // -- Data Processing --
    const { ringData, availableBudget, metrics, refDate } = useMemo(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        // 1. Filter for Current Month
        const monthlyExpenses = expenses.filter(e =>
            Number(e.year) === currentYear && Number(e.month) === currentMonth
        );
        const monthlyBudgets = budget.filter(b =>
            Number(b.year) === currentYear && Number(b.month) === currentMonth
        );

        // 2. Helpers
        const sumExpenses = (target?: ExpenseTarget) => {
            return monthlyExpenses
                .filter(e => !target || e.target === target)
                .reduce((sum, e) => sum + e.value, 0);
        };

        const sumBudget = (target?: ExpenseTarget) => {
            return monthlyBudgets
                .filter(b => !target || b.target === target)
                .reduce((sum, b) => sum + b.amount, 0);
        };

        // 3. Calculate Totals
        const totalSpent = sumExpenses();
        const totalBudget = sumBudget();

        const futureSpent = sumExpenses('Future');
        const futureBudget = sumBudget('Future');

        const livingSpent = sumExpenses('Living');
        const livingBudget = sumBudget('Living');

        const presentSpent = sumExpenses('Present');
        const presentBudget = sumBudget('Present');

        // 4. Ring Data (Outer to Inner: Total -> Future -> Living -> Present)
        const ringData = [
            {
                label: 'Total',
                spent: totalSpent,
                budget: totalBudget,
                color: '#65A1C9' // Total (Blue)
            },
            {
                label: 'Future',
                spent: futureSpent,
                budget: futureBudget,
                color: '#614FBB' // Future (Purple)
            },
            {
                label: 'Living',
                spent: livingSpent,
                budget: livingBudget,
                color: '#A9D9C7' // Living (Green)
            },
            {
                label: 'Present',
                spent: presentSpent,
                budget: presentBudget,
                color: '#C24656' // Present (Red)
            }
        ];

        // 5. Available (Total Budget - Total Spent)
        const availableBudget = Math.max(0, totalBudget - totalSpent);

        // Metrics for Mascot (Investment Health)
        const investmentPercentage = totalBudget > 0 ? (futureSpent / totalBudget) * 100 : 0;
        const pendingPercentage = totalBudget > 0 ? (availableBudget / totalBudget) * 100 : 0;

        return {
            ringData,
            availableBudget,
            metrics: { investmentPercentage, pendingPercentage },
            refDate: now
        };
    }, [expenses, budget]);


    if (!user || loading) {
        return (
            <div className="min-h-screen bg-kibo-bg flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
        );
    }

    return (
        <HomeView
            user={{ name: user.user_metadata?.name }}
            ringData={ringData}
            availableBudget={availableBudget}
            metrics={metrics}
            refDate={refDate}
            loading={loading}
        />
    );
}
