import Call2Action from "./Call2Action";
export const Hero = () => {
    return (
        <section className="bg-background  px-4">
            <div className="container mx-auto max-w-6xl text-center">
                <h1 className="text-4xl text-[var(--primaryDark)] md:text-6xl font-bold text-foreground mb-4 mt-2 leading-tight">
                    FlatCare Maintenance Planning
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                    Fast, Reliable, and Professional Maintenance Solutions
                </p>
                <Call2Action type="Start Now" link="/customer/login" />
            </div>
        </section>
    );
};