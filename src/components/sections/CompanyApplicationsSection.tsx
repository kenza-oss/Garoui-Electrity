import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import User from 'lucide-react/dist/esm/icons/user';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Download from 'lucide-react/dist/esm/icons/download';
import Eye from 'lucide-react/dist/esm/icons/eye';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import XCircle from 'lucide-react/dist/esm/icons/x-circle';
import Clock from 'lucide-react/dist/esm/icons/clock';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import { CompanyJobApplication, CompanyJobOffer } from '../../types';

interface CompanyApplicationsSectionProps {
  applications: CompanyJobApplication[];
  jobOffers: CompanyJobOffer[];
  onUpdateApplicationStatus: (applicationId: string, status: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => void;
}

export const CompanyApplicationsSection: React.FC<CompanyApplicationsSectionProps> = ({
  applications,
  jobOffers,
  onUpdateApplicationStatus
}) => {
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<CompanyJobApplication | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'accepte': return 'bg-green-100 text-green-800';
      case 'refuse': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': return 'Nouveau';
      case 'en_cours': return 'En cours';
      case 'accepte': return 'Accepté';
      case 'refuse': return 'Refusé';
      default: return status;
    }
  };

  const getJobOfferTitle = (jobOfferId: string) => {
    const jobOffer = jobOffers.find(job => job.id === jobOfferId);
    return jobOffer ? jobOffer.title : 'Poste non trouvé';
  };

  const filteredApplications = applications.filter(application => {
    const matchesJob = selectedJobFilter === 'all' || application.jobOfferId === selectedJobFilter;
    const matchesStatus = selectedStatusFilter === 'all' || application.status === selectedStatusFilter;
    return matchesJob && matchesStatus;
  });

  const handleStatusUpdate = (applicationId: string, newStatus: 'nouveau' | 'en_cours' | 'accepte' | 'refuse') => {
    onUpdateApplicationStatus(applicationId, newStatus);
  };

  const handleViewApplication = (application: CompanyJobApplication) => {
    setSelectedApplication(application);
  };

  const closeApplicationModal = () => {
    setSelectedApplication(null);
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-48">
          <select
            value={selectedJobFilter}
            onChange={(e) => setSelectedJobFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Tous les postes</option>
            {jobOffers.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        </div>
        
        <div className="sm:w-48">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="accepte">Accepté</option>
            <option value="refuse">Refusé</option>
          </select>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {application.electricianName}
                </h3>
                <p className="text-gray-600 mb-2">
                  Poste : {getJobOfferTitle(application.jobOfferId)}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {application.electricianEmail}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {application.electricianPhone}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(application.appliedAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {getStatusLabel(application.status)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewApplication(application)}
                  className="flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir détails
                </Button>
                
                {application.cvUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger CV
                  </Button>
                )}
              </div>

              <div className="flex space-x-2">
                {application.status !== 'accepte' && (
                  <Button
                    onClick={() => handleStatusUpdate(application.id, 'accepte')}
                    size="sm"
                    className="flex items-center bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accepter
                  </Button>
                )}
                
                {application.status !== 'refuse' && (
                  <Button
                    onClick={() => handleStatusUpdate(application.id, 'refuse')}
                    variant="outline"
                    size="sm"
                    className="flex items-center text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Refuser
                  </Button>
                )}
                
                {application.status === 'nouveau' && (
                  <Button
                    onClick={() => handleStatusUpdate(application.id, 'en_cours')}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    En cours
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune candidature</h3>
            <p className="text-gray-600">
              {selectedJobFilter === 'all' && selectedStatusFilter === 'all' 
                ? 'Aucune candidature reçue pour le moment.'
                : 'Aucune candidature ne correspond aux filtres sélectionnés.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de détails de la candidature */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Détails de la candidature</h3>
                <button 
                  onClick={closeApplicationModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informations du candidat</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom complet :</span>
                      <span className="font-medium">{selectedApplication.electricianName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email :</span>
                      <span className="font-medium">{selectedApplication.electricianEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone :</span>
                      <span className="font-medium">{selectedApplication.electricianPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de candidature :</span>
                      <span className="font-medium">
                        {new Date(selectedApplication.appliedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Poste</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{getJobOfferTitle(selectedApplication.jobOfferId)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                  <div className="space-y-2">
                    {selectedApplication.cvUrl && (
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-primary mr-2" />
                          <span>CV</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    )}
                    
                    {selectedApplication.coverLetterUrl && (
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-primary mr-2" />
                          <span>Lettre de motivation</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'accepte')}
                      className="flex items-center bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accepter la candidature
                    </Button>
                    
                    <Button
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'refuse')}
                      variant="outline"
                      className="flex items-center text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Refuser la candidature
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
