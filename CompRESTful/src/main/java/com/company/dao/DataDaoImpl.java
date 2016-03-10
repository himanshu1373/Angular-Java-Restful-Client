package com.company.dao;

//JNDI Resource Liabrary disabled
//import java.sql.Connection;
//import java.sql.SQLException;
//import java.util.ArrayList;
import java.util.List;

//import javax.naming.Context;
//import javax.naming.InitialContext;
//import javax.naming.NamingException;
//import javax.sql.DataSource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import com.company.model.Company;
import com.company.model.Owner;
//import com.company.model.updateCompany;

public class DataDaoImpl implements DataDao {

	@Autowired
	SessionFactory sessionFactory;

	Session session = null;
	Transaction tx = null;

	@Override
	public boolean addEntity(Company company) throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		session.save(company);
	//	session.createSQLQuery("select * from company");
		
		if (!tx.wasCommitted())
		    tx.commit();
		
		session.close();

		return false;
	/*	DataSource dataSource; JNDI
		try {
		    Context initContext = new InitialContext();
		    Context envContext  = (Context)initContext.lookup("java:/comp/env");
		    dataSource = (DataSource) envContext.lookup("jdbc/company_db");
		    } catch (NamingException ex) {
		    System.out.println("[DEBUG]: Failed to initiate JDBC context");
		    ex.printStackTrace();
		    return false;
		 }

		 try {
		     dataSource.getConnection();
		     System.out.println(dataSource.getConnection().createStatement().
			            execute("select * from company"));

		 } catch (SQLException ex){
		     System.out.println("[DEBUG]: Failed to establish connection with datastore");
		     ex.printStackTrace();
		     return false;
		 }
		 
	
		return false;*/
	}
   // Public method to add an Owner
	@Override
	public boolean addOwnerEntity(Owner owner) throws Exception {
		session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		 try {
		session.save(owner);
		if (!tx.wasCommitted())
		    tx.commit();
		 }
		 catch(Exception e) {
		        tx.rollback();
		        session.clear();
		        if(e instanceof org.hibernate.exception.ConstraintViolationException){
		            Transaction tx1 = session.beginTransaction();
		            tx1.commit();
		        
		            return false;
		     }
		}
			session.close();
		return false;
	}
	 // Public method to update an Owner by owner id
	@Override
	public boolean updateOwnerbyID(Owner owner) throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		session.update(owner);
		if (!tx.wasCommitted())
		    tx.commit();
		
		session.close();
		return false;
	}
	
	 // Public method to update an Owner record
	@Override
	public boolean updateEntity(Company company) throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		session.update(company);

		if (!tx.wasCommitted())
		    tx.commit();
		
		session.close();

		return false;
	}
	 // Public method to get the Company by Id
	@Override
	public Company getEntityById(long compid) throws Exception {
		session = sessionFactory.openSession();
		session.beginTransaction();
		Company company = (Company) session.load(Company.class,
				new Long(compid));
		tx = session.getTransaction();
		if (!tx.wasCommitted())
		    tx.commit();
		return company;
	}

	// Public list to get all the Company
	@SuppressWarnings("unchecked")
	@Override
	public List<Company> getEntityList() throws Exception {
	
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		List<Company> companyList = session.createCriteria(Company.class)
				.list();
		if (!tx.wasCommitted())
		    tx.commit();
		
		session.close();
		return companyList;
	}
	// Public list to get all owner List
	@SuppressWarnings("unchecked")
	@Override
	public List<Owner> getOwnerList() throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		List<Owner> ownerList = session.createCriteria(Owner.class)
				.list();
		if (!tx.wasCommitted())
		    tx.commit();
		
		session.close();
		return ownerList;
	}
	// Public list to get owner by Id
	@SuppressWarnings("unchecked")
	@Override
	public List<Owner> getOwnerById(long compid) throws Exception {
		session = sessionFactory.openSession();
		session.beginTransaction();
		List<Owner> ownerList = session.createCriteria(Owner.class)
				.add(Restrictions.eq("ownerCompid", compid)).list();
	tx = session.getTransaction();

	if (!tx.wasCommitted())
	    tx.commit();

		return ownerList;
	}
	
    //Delete Owner by Id
	@Override
	public boolean deleteOwnerById(long ownerId)
			throws Exception {
		session = sessionFactory.openSession();
		try {
		Object o = session.load(Owner.class, ownerId);
		tx = session.getTransaction();
		session.beginTransaction();
		session.delete(o);

		if (!tx.wasCommitted())
		    tx.commit();
		 }
		 catch(Exception e) {
		        tx.rollback();
		        session.clear();
		        if(e instanceof org.hibernate.exception.ConstraintViolationException){
		            Transaction tx1 = session.beginTransaction();
		            tx1.commit();
		        
		            return false;
		     }
		}
		return false;
	}
	
	
	  //Delete Owner by CompId
		@Override
		public boolean deleteOwnerByCompId(long compId)
				throws Exception {
			session = sessionFactory.openSession();
			try {
			Object o = session.load(Owner.class, compId);
			tx = session.getTransaction();
			session.beginTransaction();
			session.delete(o);

			if (!tx.wasCommitted())
			    tx.commit();
			 }
			 catch(Exception e) {
			        tx.rollback();
			        session.clear();
			        if(e instanceof org.hibernate.exception.ConstraintViolationException){
			            Transaction tx1 = session.beginTransaction();
			            tx1.commit();
			        
			            return false;
			     }
			}
			return false;
		}
		
 // Public method to delete the company Id
	@Override
	public boolean deleteEntity(long compid)
			throws Exception {
		session = sessionFactory.openSession();
		try {
		Object o = session.load(Company.class, compid);
		Transaction tx = session.getTransaction();
		session.beginTransaction();
		session.delete(o);
	
		if (!tx.wasCommitted())
		    tx.commit();
		
		 }
		 catch(Exception e) {
		        tx.rollback();
		        session.clear();
		        if(e instanceof org.hibernate.exception.ConstraintViolationException){
		            Transaction tx1 = session.beginTransaction();
		            tx1.commit();
		        
		            return false;
		     }
		}
		return false;
	}

}