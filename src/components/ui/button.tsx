export function Button({ children }: { children: React.ReactNode }) {
	return (
		<button className="inline-flex items-center rounded bg-foreground text-background px-3 py-1.5 hover:opacity-90">
			{children}
		</button>
	);
}


