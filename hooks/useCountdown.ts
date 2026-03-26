"use client";
import { useState, useEffect } from "react";
import { config } from "@/lib/config";

export function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date(config.birthdayPerson.birthday);
            targetDate.setFullYear(new Date().getFullYear());

            const now = new Date();

            // If birthday has passed this year, look for next year
            if (targetDate.getTime() < now.getTime() - 86400000) {
                targetDate.setFullYear(targetDate.getFullYear() + 1);
            }

            const difference = targetDate.getTime() - now.getTime();
            const isToday = now.getDate() === targetDate.getDate() && now.getMonth() === targetDate.getMonth();

            if (isToday) {
                setIsBirthday(true);
                return;
            }

            setIsBirthday(false);
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, []);

    return { timeLeft, isBirthday };
}
