import React, { useState } from 'react';
import { verifyCertificate } from '../services/blockchainService';

const VerifyCertificate = () => {
    const [certificateId, setCertificateId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!certificateId.trim()) {
            setError('Please enter a certificate ID');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            const result = await verifyCertificate(certificateId.trim());
            setVerificationResult(result);
        } catch (err) {
            setError('Verification failed. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const CertificateView = ({ certificate }) => {
        return (
            <div className="bg-white border-2 border-gold-400 rounded-lg p-8 text-center">
                <div className="mb-8">
                    <img
                        src="/images/certificate-logo.png"
                        alt="Right Tech Centre"
                        className="h-16 mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-serif font-bold text-gray-800">Certificate of Completion</h1>
                </div>

                <div className="my-8">
                    <p className="text-lg text-gray-600 mb-2">This certifies that</p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{certificate.studentName}</h2>
                    <p className="text-lg text-gray-600 mb-2">has successfully completed the course</p>
                    <h3 className="text-xl font-semibold text-gray-800">{certificate.courseName}</h3>
                </div>

                <div className="flex justify-between items-center mt-12">
                    <div className="text-center">
                        <div className="border-t-2 border-gray-400 pt-2">
                            <p className="font-semibold">Date</p>
                            <p>{new Date(certificate.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <img
                            src="/images/signature.png"
                            alt="Director Signature"
                            className="h-12 mx-auto mb-2"
                        />
                        <div className="border-t-2 border-gray-400 pt-2">
                            <p className="font-semibold">Director</p>
                            <p>Right Tech Centre</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-gray-500">
                        Certificate ID: {certificate.id}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="certificate-verification max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Certificate Verification</h1>
            
            <div className="verification-form bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Enter Certificate ID or scan QR code"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        aria-label="Certificate ID"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={handleVerify} 
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
                <button className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    Scan QR Code
                </button>
            </div>
            
            {error && (
                <div className="error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}
            
            {verificationResult && (
                <div className={`verification-result ${verificationResult.valid ? 'valid' : 'invalid'}`}>
                    {verificationResult.valid ? (
                        <div>
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                <h2 className="text-xl font-semibold mb-2">✓ Certificate Verified</h2>
                                <p>This certificate is valid and authentic.</p>
                            </div>
                            
                            {verificationResult.details && (
                                <CertificateView certificate={verificationResult.details} />
                            )}
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">✗ Certificate Invalid</h2>
                            <p>This certificate could not be verified. Please check the certificate ID and try again.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyCertificate;
