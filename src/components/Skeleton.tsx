import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-white/10 rounded-xl ${className}`}></div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-4">
      <Skeleton className="w-full aspect-[4/3] rounded-2xl mb-6" />
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
