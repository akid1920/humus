import { Linkedin, Mail } from 'lucide-react';
import './TeamMember.css';

const TeamMember = ({ name, role, session, image, bio, email, linkedin, variant = 'default' }) => {
    return (
        <div className={`team-member ${variant}`}>
            <div className="member-image-container">
                {image ? (
                    <img src={image} alt={name} className="member-image" />
                ) : (
                    <div className="member-placeholder">
                        <span>{name.charAt(0)}</span>
                    </div>
                )}
            </div>
            <div className="member-info">
                <h3 className="member-name">{name}</h3>
                <span className="member-role">{role}</span>
                {session && <span className="member-session">{session}</span>}
                {bio && <p className="member-bio">{bio}</p>}

                <div className="member-socials">
                    {email && (
                        <a href={`mailto:${email}`} className="social-link" title="Email">
                            <Mail size={18} />
                        </a>
                    )}
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamMember;
