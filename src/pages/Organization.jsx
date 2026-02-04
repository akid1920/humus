import { organizationData, advisors } from '../data/organization';
import TeamMember from '../components/TeamMember';
import './Organization.css';

const Organization = () => {
    const { president, tier2, tier3, tier4, members } = organizationData;

    const renderMember = (member) => (
        <div key={member.id} className="org-card-wrapper">
            <TeamMember
                name={member.name}
                role={member.role}
                session={member.designation}
                image={member.image}
            />
        </div>
    );

    return (
        <div className="organization-page">
            {/* Header */}
            <section className="page-header org-header">
                <div className="container">
                    <h1 className="animate-fade-in">Executive Committee</h1>
                    <p className="animate-fade-in">2025-2026 Session</p>
                </div>
            </section>

            {/* Main Structure */}
            <section className="section org-structure-section">
                <div className="container">

                    {/* Tier 1: President */}
                    <div className="org-tier tier-1">
                        {renderMember(president)}
                    </div>

                    <div className="connector-line"></div>

                    {/* Tier 2: VPs and GS */}
                    <div className="org-tier tier-2">
                        {tier2.map(renderMember)}
                    </div>

                    <div className="connector-line"></div>

                    {/* Tier 3: Secretaries */}
                    <div className="org-tier tier-3">
                        {tier3.map(renderMember)}
                    </div>

                    <div className="connector-line"></div>

                    {/* Tier 4: Special Secretaries */}
                    <div className="org-tier tier-4">
                        {/* Left */}
                        {renderMember(tier4[0])}

                        {/* Center Logo Placeholder */}
                        <div className="org-logo-center">
                            <span className="logo-placeholder-text">HUMUS</span>
                        </div>

                        {/* Right */}
                        {renderMember(tier4[1])}
                    </div>

                    <div className="connector-line"></div>

                    {/* Tier 5: Members */}
                    <div className="tier-label">Members</div>
                    <div className="org-tier tier-5">
                        {members.map(renderMember)}
                    </div>

                </div>
            </section>

            {/* Advisors Section */}
            <section className="section bg-light org-structure-section">
                <div className="container">
                    <h2 className="text-center mb-lg">Advisors</h2>

                    {/* Reuse org-tier structure for consistent look */}

                    {/* Tier 1: Chief Advisor */}
                    <div className="org-tier tier-1">
                        {advisors.filter(a => a.role.includes('Chief')).map(renderMember)}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Organization;
