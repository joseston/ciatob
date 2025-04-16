import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
        <Share2 className="w-4 h-4 mr-2" />
        Compartir este artículo
      </h3>
      <div className="flex space-x-2">
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Compartir en Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-full bg-gray-100 hover:bg-sky-100 text-gray-600 hover:text-sky-500 transition-colors"
          aria-label="Compartir en Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 transition-colors"
          aria-label="Compartir en LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors"
          aria-label="Copiar enlace"
        >
          {copied ? (
            <Check className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;